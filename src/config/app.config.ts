import { ConfigType, registerAs } from '@nestjs/config';
import { envBoolean } from '@/global/env';

export const appRegToken = 'appRegToken';

/**
 * 在registerAs第二个参数的工厂函数中process.env对象将包含完全解析的环境变量键/值对
 *（具有如上所述的.env文件和已解析和合并的外部定义变量）
 */
export const AppConfig = registerAs(appRegToken, () => {
  return {
    isDemoMode: envBoolean('DEMO_MODE'),
    demoAccount: {
      id: -1,
      username: '__inner_demo_account__',
      roles: [],
    },
  };
});

export type IAppConfig = ConfigType<typeof AppConfig>;
