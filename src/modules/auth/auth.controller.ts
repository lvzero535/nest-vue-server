import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auto.dto';
import { IsPublic } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 跳过认证
  @IsPublic()
  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
