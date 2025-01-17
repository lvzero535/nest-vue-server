import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { AuthStrategy } from '../auth.constant';

/**
 * PassportStrategy函数的第一个参数是引用的策略对象，第二个参数是策略名称，默认是local。
 * 策略名称 在 @nestjs/passport 中的 AuthGuard 会自动使用
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.LOCAL,
) {
  constructor(private userService: UserService) {
    /**
     * 这是passport-local的配置，默认是username和password
     * 如果你的字段名不是username和password，你可以在这里修改
     * 比如：
     * super({
     *  usernameField: 'email',
     *  passwordField: 'password',
     * });
     })
     */
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  /**
   * 这是本地策略调用verify函数时会调用这个函数，并会传入username和password
   * 处理程序必须是 Post请求, 并且必须有两个参数
   * 一个是usernameField指定的值，不指定，默认是username
   * 一个是passwordField指定的值，不指定，默认是password
   * @param username 用户名
   * @param password 密码
   * @returns 返回user，会把user放到req.user中。
   */
  async validate(username: string, password: string) {
    console.log('本地策略验证用户', username, password);
    const user = await this.userService.findUserByUserName(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
