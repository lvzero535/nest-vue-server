import { ConfigType, registerAs } from '@nestjs/config';
import { env, envNumber } from '@/global/env';

export const securityRegToken = 'securityRegToken';

/**
 * 在registerAs第二个参数的工厂函数中process.env对象将包含完全解析的环境变量键/值对
 *（具有如上所述的.env文件和已解析和合并的外部定义变量）
 */
export const SecurityConfig = registerAs(securityRegToken, () => {
  return {
    jwtSecret: env('JWT_SECRET'),
    jwtExpire: envNumber('JWT_EXPIRE'),
    refreshSecret: env('REFRESH_TOKEN_SECRET'),
    refreshExpire: env('REFRESH_TOKEN_EXPIRE'),
  };
});

export type ISecurityConfig = ConfigType<typeof SecurityConfig>;
