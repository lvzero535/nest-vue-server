import { AppConfig } from './app.config';
import { DatabaseConfig } from './database.config';
import { SecurityConfig } from './security.config';
/**
 * 在app.module.ts中使用，被ConfigModule加载
 */
export default {
  DatabaseConfig,
  SecurityConfig,
  AppConfig,
};
