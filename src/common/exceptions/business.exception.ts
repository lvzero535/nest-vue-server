import { ErrorCodeEnum } from '@/constants/error-code.constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(public message: ErrorCodeEnum) {
    const [code, msg] = message.split(':');
    super(
      {
        code: +code,
        msg,
      },
      HttpStatus.OK,
    );
  }
}
