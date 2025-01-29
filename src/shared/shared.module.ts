import { Global, Module } from '@nestjs/common';
import { SharedConfigService } from './services/config.service';
const providers = [SharedConfigService];

@Global()
@Module({
  providers: providers,
  exports: [...providers],
})
export class SharedModule {}
