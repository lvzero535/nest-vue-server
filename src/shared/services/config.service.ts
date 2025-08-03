import { appRegToken, IAppConfig } from '@/config/app.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedConfigService {
  constructor(private configService: ConfigService) {}

  getAppConfig(key?: keyof IAppConfig) {
    const appConfig = this.configService.get<IAppConfig>(appRegToken);
    return key ? appConfig[key] : appConfig;
  }
}
