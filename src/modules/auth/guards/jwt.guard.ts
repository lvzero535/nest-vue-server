import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy, SKIP_AUTH_KEY } from '../auth.constant';
import { Reflector } from '@nestjs/core';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';

/**
 * JWT验证
 * 替换 @UseGuards(AuthGuard('jwt'))
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JWT) {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 跳过验证
    if (skipAuth) {
      return true;
    }
    // 验证，如果验证失败，会抛出异常
    return super.canActivate(context);
  }

  /**
   * @description: 验完成后调用
   * @param {*} error 这是 Passport 策略执行过程中发生的任何潜在错误。如果在验证过程中没有错误发生，这个值通常是 null
   * @param {*} user 这是 Passport 策略验证成功后返回的用户对象。如果验证失败，这个值可能是 false 或 null，具体取决于你使用的 Passport 策略
   * @param {*} info 如果验证失败，info通常是一个error对象
   * @returns
   */
  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new BusinessException(ErrorCodeEnum.INVALID_LOGIN);
    }
    return user;
  }
}
