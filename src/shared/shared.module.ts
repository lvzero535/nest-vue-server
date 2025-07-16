import { Global, Module } from '@nestjs/common';
import { SharedConfigService } from './services/config.service';
import { LoggerModule } from './logger/logger.module';
const providers = [SharedConfigService];

@Global()
@Module({
  providers: providers,
  exports: [...providers],
  imports: [LoggerModule.forRoot()],
})
export class SharedModule {}
