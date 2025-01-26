import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../auth.constant';

/**
 * 当接口不需要检测用户登录时，添加此装饰器
 */
export const IsPublic = () => SetMetadata(PUBLIC_KEY, true);
