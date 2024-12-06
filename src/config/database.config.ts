import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { env, envBoolean, envNumber } from '@/global/env';

export const getDataSourceOptions = (): DataSourceOptions => ({
  type: 'mysql',
  host: env('DB_HOST'),
  port: envNumber('DB_PORT', 3306),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  synchronize: envBoolean('DB_SYNCHRONIZE', false),
});

export const dbRegToken = 'dbRegToken';

/**
 * 在registerAs第二个参数的工厂函数中process.env对象将包含完全解析的环境变量键/值对
 *（具有如上所述的.env文件和已解析和合并的外部定义变量）
 */
export const DatabaseConfig = registerAs(dbRegToken, getDataSourceOptions);
