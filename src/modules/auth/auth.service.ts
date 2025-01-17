import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auto.dto';
import { UserService } from '../user/user.service';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.userService.findUserByUserName(authDto.username);
    if (!user || user?.password !== authDto.password) {
      throw new BusinessException(ErrorCodeEnum.USER_PWD_ERROR);
    }
    const payload = {
      uid: user.id,
      username: user.username,
      roles: user.roles.map((i) => i.name),
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
    };
  }
}
