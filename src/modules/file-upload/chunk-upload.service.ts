import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UploadRecordEntity, UploadChunkEntity } from './file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CheckReqInfo,
  CheckRespInfo,
  ChunkInfo,
  FileInfo,
} from './file-upload.dto';
import * as path from 'path';
import * as fs from 'fs';
import { pipeline } from 'stream/promises';

const FILE_UPLOAD_DIR = path.join(__dirname, '../../..', 'uploads/files');
const CHUNK_DIR = path.join(__dirname, '../../..', 'uploads/chunks');

function getFinalFilePath(fileHash: string, fileName: string) {
  const finalFilePath = path.join(FILE_UPLOAD_DIR, `${fileHash}_${fileName}`);
  return finalFilePath;
}

@Injectable()
export class ChunkUploadService {
  constructor(
    @InjectRepository(UploadRecordEntity)
    private uploadRecordRepository: Repository<UploadRecordEntity>,
    @InjectRepository(UploadChunkEntity)
    private uploadChunkRepository: Repository<UploadChunkEntity>,
  ) {}

  // 检查上传状态
  async checkUploadStatus(
    checkReq: CheckReqInfo,
    user: IAuthUser,
  ): Promise<CheckRespInfo> {
    const record = await this.uploadRecordRepository.findOne({
      where: {
        fileHash: checkReq.fileHash,
        userId: user.uid,
        fileSize: checkReq.fileSize,
        lastModified: checkReq.lastModified,
      },
    });

    if (!record) {
      // 文件不存在，开始新上传
      const newRecord = this.uploadRecordRepository.create({
        fileHash: checkReq.fileHash,
        fileName: checkReq.fileName,
        fileSize: checkReq.fileSize,
        lastModified: checkReq.lastModified,
        chunkSize: checkReq.chunkSize,
        totalChunks: checkReq.totalChunks,
        status: 'initial',
        userId: user.uid,
      });
      await this.uploadRecordRepository.save(newRecord);
      return { status: 'initial', uploaded: [] };
    }

    const finalFilePath = getFinalFilePath(record.fileHash, record.fileName);

    // 检查是否已完成
    if (record.status === 'complete' && fs.existsSync(finalFilePath)) {
      return {
        status: 'complete',
        uploaded: [],
      };
    }

    record.chunkSize = checkReq.chunkSize;
    record.totalChunks = checkReq.totalChunks;

    await this.uploadRecordRepository.save(record);

    const existingChunks = await this.uploadChunkRepository.find({
      where: {
        fileHash: checkReq.fileHash,
        fileSize: checkReq.fileSize,
        lastModified: checkReq.lastModified,
        chunkSize: checkReq.chunkSize,
      },
    });

    console.log('existingChunks ===> ', existingChunks.length);
    const uploaded = new Set<number>();
    for (const chunk of existingChunks) {
      const chunkPath = this.getChunkPath(checkReq.fileHash, chunk.index);
      console.log('chunkpath ==>:', chunkPath);
      if (fs.existsSync(chunkPath)) {
        uploaded.add(chunk.index);
      }
    }

    if (uploaded.size === 0) {
      return { status: 'initial', uploaded: [] };
    } else {
      return {
        status: 'partial',
        uploaded: Array.from(uploaded),
      };
    }
  }

  // 上传块
  async uploadChunk(
    chunkInfo: ChunkInfo,
    chunkBuffer: Buffer,
    user: IAuthUser,
  ): Promise<{ success: boolean }> {
    const record = await this.uploadRecordRepository.findOne({
      where: {
        fileHash: chunkInfo.fileHash,
        userId: user.uid,
        fileSize: chunkInfo.fileSize,
        lastModified: chunkInfo.lastModified,
      },
    });

    if (!record) {
      throw new Error('Upload record not found');
    }

    // 确保块目录存在
    if (!fs.existsSync(CHUNK_DIR)) {
      fs.mkdirSync(CHUNK_DIR, { recursive: true });
    }

    const chunkPath = this.getChunkPath(chunkInfo.fileHash, chunkInfo.index);
    fs.writeFileSync(chunkPath, chunkBuffer);

    // 更新记录

    const existingChunk = await this.uploadChunkRepository.findOne({
      where: {
        fileHash: chunkInfo.fileHash,
        fileSize: chunkInfo.fileSize,
        lastModified: chunkInfo.lastModified,
        index: chunkInfo.index,
        chunkSize: chunkInfo.chunkSize,
        chunkHash: chunkInfo.chunkHash,
      },
    });

    if (!existingChunk) {
      this.uploadChunkRepository.save({
        fileHash: chunkInfo.fileHash,
        fileName: chunkInfo.fileName,
        fileSize: chunkInfo.fileSize,
        lastModified: chunkInfo.lastModified,
        chunkSize: chunkInfo.chunkSize,
        chunkHash: chunkInfo.chunkHash,
        index: chunkInfo.index,
      });
    }

    return { success: true };
  }

  // 合并文件
  async mergeFile(
    fileMeta: FileInfo,
    user: IAuthUser,
  ): Promise<{ success: boolean }> {
    const record = await this.uploadRecordRepository.findOne({
      where: {
        fileHash: fileMeta.fileHash,
        userId: user.uid,
        fileSize: fileMeta.fileSize,
        lastModified: fileMeta.lastModified,
      },
    });

    if (!record) {
      throw new Error('Upload record not found');
    }

    const totalChunks = record.totalChunks;

    const existingChunks = await this.uploadChunkRepository.find({
      where: {
        fileHash: fileMeta.fileHash,
        fileSize: fileMeta.fileSize,
        lastModified: fileMeta.lastModified,
        chunkSize: record.chunkSize,
      },
    });

    const chunkCount = new Set(existingChunks.map((chunk) => chunk.index)).size;

    console.log('chunkCount', chunkCount, 'totalChunks', totalChunks);
    if (chunkCount !== totalChunks) {
      throw new Error('Not all chunks uploaded');
    }

    // 确保上传目录存在
    if (!fs.existsSync(FILE_UPLOAD_DIR)) {
      fs.mkdirSync(FILE_UPLOAD_DIR, { recursive: true });
    }

    const finalFilePath = getFinalFilePath(record.fileHash, record.fileName);
    // const writeStream = fs.createWriteStream(finalFilePath);

    // 按顺序合并块
    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = this.getChunkPath(record.fileHash, i);
      if (!fs.existsSync(chunkPath)) {
        throw new Error(`Chunk ${i} not found`);
      }
      await pipeline(
        fs.createReadStream(chunkPath),
        fs.createWriteStream(finalFilePath, {
          flags: 'a',
        }),
      );
    }

    // writeStream.end();

    // 清理块文件和记录
    await this.cleanupChunks(record.fileHash);

    record.status = 'complete';
    await this.uploadRecordRepository.save(record);

    return { success: true };
  }

  // 取消上传
  async cancelUpload(
    fileMeta: FileInfo,
    user: IAuthUser,
  ): Promise<{ success: boolean }> {
    const record = await this.uploadRecordRepository.findOne({
      where: { fileHash: fileMeta.fileHash, userId: user.uid },
    });

    if (record) {
      await this.cleanupChunks(record.fileHash);
      await this.uploadRecordRepository.delete({
        fileHash: record.fileHash,
        userId: user.uid,
      });
    }

    return { success: true };
  }

  private getChunkPath(hash: string, index: number): string {
    return path.join(CHUNK_DIR, `${hash}_chunk_${index}`);
  }

  private async cleanupChunks(hash: string): Promise<void> {
    const chunkDir = CHUNK_DIR;
    if (fs.existsSync(chunkDir)) {
      const files = fs.readdirSync(chunkDir);
      for (const file of files) {
        if (file.startsWith(hash)) {
          fs.unlinkSync(path.join(chunkDir, file));
        }
      }
    }
  }
}
