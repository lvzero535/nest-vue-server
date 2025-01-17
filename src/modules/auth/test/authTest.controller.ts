import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller()
export class AuthTestController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  // 直接使用LocalAuthGuard比AuthGuard('local')更好点
  @UseGuards(LocalAuthGuard)
  @Post('auth/test/login')
  login(@Request() req) {
    // req.user 是策略中validate函数的返回值
    return this.authService.login(req.user);
    // return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/test/info')
  getInfo(@Request() req) {
    // req.user 是策略中validate函数的返回值
    return req.user;
  }
}
