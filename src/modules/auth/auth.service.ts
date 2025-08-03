import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auto.dto';
import { UserService } from '../user/user.service';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';
import { JwtService } from '@nestjs/jwt';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private menuService: MenuService,
  ) {}

  async getAuthUser(authDto: AuthDto) {
    // 校验用户名密码
    const user = await this.userService.findUserByUserName(authDto.username);
    if (!user || user?.password !== authDto.password) {
      throw new BusinessException(ErrorCodeEnum.USER_PWD_ERROR);
    }
    return user;
  }

  async login(authDto: AuthDto) {
    // 校验用户名密码
    const user = await this.getAuthUser(authDto);
    const payload: IAuthUser = {
      uid: user.id,
      username: user.username,
      roleIds: user.roles.map((i) => i.id),
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
    };
  }

  async getPermissions(roleIds: number[]) {
    return this.menuService.getPermissions(roleIds);
  }
}
