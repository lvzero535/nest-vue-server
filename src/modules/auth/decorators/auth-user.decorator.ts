import { createParamDecorator, ExecutionContext } from '@nestjs/common';
type Payload = keyof IAuthUser;
/**
 * @description 获取当前登录用户信息
 * @param key 可选，获取用户信息中的某个字段
 * @returns
 */
export const AuthUser = createParamDecorator(
  (key: Payload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // jwt 认证通过后，用户信息会挂载到 request.user 上
    const user = request.user;
    return key ? user[key] : user;
  },
);
