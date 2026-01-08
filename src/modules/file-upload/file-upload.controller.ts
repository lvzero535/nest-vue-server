import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';
import { CheckReqInfo, ChunkInfo, FileInfo } from './file-upload.dto';
import { ChunkUploadService } from './chunk-upload.service';
import { diskStorage } from 'multer';

@Controller()
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly chunkUploadService: ChunkUploadService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        exceptionFactory: (error: string) => {
          if (error.includes('size')) {
            throw new BusinessException(ErrorCodeEnum.FILE_SIZE_ERROR);
          }
          throw new BusinessException(ErrorCodeEnum.FILE_TYPE_ERROR);
        },
        validators: [
          // 限制文件大小为 5M
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
          }),
          // 限制文件类型为图片
          new FileTypeValidator({
            fileType: '.(png|jpeg|jpg|gif|webp)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @AuthUser() user: IAuthUser,
  ) {
    return this.fileUploadService.saveTempFile(user, file);
  }

  @Post('file/check')
  async checkFile(@Body() checkReq: CheckReqInfo, @AuthUser() user: IAuthUser) {
    return this.chunkUploadService.checkUploadStatus(checkReq, user);
  }

  @Post('file/upload')
  @UseInterceptors(FileInterceptor('chunk'))
  async uploadChunk(
    @UploadedFile() file: Express.Multer.File,
    @Body() chunkInfo: ChunkInfo,
    @AuthUser() user: IAuthUser,
  ) {
    return this.chunkUploadService.uploadChunk(chunkInfo, file.buffer, user);
  }

  @Post('file/merge')
  async mergeFile(@Body() fileMeta: FileInfo, @AuthUser() user: IAuthUser) {
    return this.chunkUploadService.mergeFile(fileMeta, user);
  }

  @Delete('file/cancel')
  async cancelUpload(@Body() fileMeta: FileInfo, @AuthUser() user: IAuthUser) {
    return this.chunkUploadService.cancelUpload(fileMeta, user);
  }

  @Post('file/large')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/large',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 1024 * 5,
      },
    }),
  )
  largeFileUpload(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log('上传成功:', file.filename, '大小:', file.size);
    return { filename: file.filename, size: file.size };
  }
}
