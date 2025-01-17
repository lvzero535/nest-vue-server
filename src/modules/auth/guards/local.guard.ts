import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../auth.constant';

/**
 * 本地验证
 * 替换 @UseGuards(AuthGuard('local'))
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthStrategy.LOCAL) {}
