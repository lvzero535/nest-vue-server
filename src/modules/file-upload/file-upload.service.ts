import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { FileEntity } from './file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileDto } from './file-upload.dto';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const FILE_TEMP_DIR = path.join(__dirname, '../../..', 'uploads/temp');
const FILE_UPLOAD_DIR = path.join(__dirname, '../../..', 'uploads/files');

@Injectable()
export class FileUploadService {
  /**
   * @InjectRepository(FileEntity) 注入User的存储库到服务里
   * @param usersRepository 存储库
   */
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async findOne(filename: string) {
    console.log('filename', filename);
    return this.fileRepository.findOne({
      where: {
        filename: Like(`%${filename}%`),
      },
    });
  }

  saveNormalFile(fileDto: FileDto) {
    fileDto.isTempFile = false;

    // 检查上传目录是否存在，不存在则创建
    if (!fs.existsSync(FILE_UPLOAD_DIR)) {
      fs.mkdirSync(FILE_UPLOAD_DIR, { recursive: true });
    }

    fs.copyFileSync(
      path.join(FILE_TEMP_DIR, fileDto.filename),
      path.join(FILE_UPLOAD_DIR, fileDto.filename),
    );

    // 删除临时文件
    fs.unlinkSync(path.join(FILE_TEMP_DIR, fileDto.filename));

    return this.fileRepository.save(fileDto);
  }

  async saveTempFile(user: IAuthUser, file: Express.Multer.File) {
    // 生成唯一文件名
    const fileExt = path.extname(file.originalname);
    const uuid = uuidv4();
    const filename = `${uuid}${fileExt}`;

    const fileDto: FileDto = {
      filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      userId: user.uid,
      isTempFile: true,
    };

    // 检查上传目录是否存在，不存在则创建
    if (!fs.existsSync(FILE_TEMP_DIR)) {
      fs.mkdirSync(FILE_TEMP_DIR, { recursive: true });
    }
    const filePath = path.join(FILE_TEMP_DIR, filename);

    console.log('filePath', filePath);

    // 检查文件是否存在，存在则删除
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 将文件写入指定路径
    fs.writeFileSync(filePath, file.buffer);

    this.fileRepository.save(fileDto);

    return uuid;
  }
}
