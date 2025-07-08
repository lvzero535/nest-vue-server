import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';

@Controller()
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

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
}
