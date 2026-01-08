import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FileEntity,
  UploadChunkEntity,
  UploadRecordEntity,
} from './file-upload.entity';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { ChunkUploadService } from './chunk-upload.service';

@Module({
  /**
   * TypeOrmModule.forFeature，定义了当前模块中注册哪些存储库，这里传入的参数是实体（带有@Entity）
   * 这里传了FileEntity，可以在服务中使用@InjectRepository，注入File相关的实体
   */
  imports: [
    TypeOrmModule.forFeature([
      FileEntity,
      UploadRecordEntity,
      UploadChunkEntity,
    ]),
  ],
  providers: [FileUploadService, ChunkUploadService],
  controllers: [FileUploadController],
  exports: [FileUploadService],
})
export class FileUploadModule {}
