import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LoggerService } from './shared/logger/logger.service';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'uploads/files'));
  setupSwagger(app);
  await app.listen(process.env.APP_PORT ?? 3000, '0.0.0.0', () => {
    // 替换默认日志
    app.useLogger(app.get(LoggerService));
  });
}
bootstrap();
