import { ISecurityConfig, securityRegToken } from '@/config/security.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthStrategy } from '../auth.constant';

/**
 * PassportStrategy函数的第一个参数是引用的策略对象，第二个参数是策略名称，默认是jwt。
 * 策略名称 在 @nestjs/passport 中的 AuthGuard 会自动使用
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
  constructor(private readonly configService: ConfigService) {
    const { jwtSecret } = configService.get<ISecurityConfig>(securityRegToken);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  /**
   * 通过配置的jwtFromRequest，从请求中获取jwtToken
   * 然后通过secretOrKey，验证jwtToken是否有效
   * 如果有效，就会把jwtToken解析成payload，然后把payload放到req.user中。
   * @param payload
   * @returns 返回payload，会把payload放到req.user中。
   */
  async validate(payload: IAuthUser) {
    return {
      uid: payload.uid,
      username: payload.username,
      roleIds: payload.roleIds,
      roleNames: payload.roleNames,
    };
  }
}
