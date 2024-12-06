import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): object {
    return {
      msg: 'Hello World!',
      db: {
        host: this.configService.get('dbRegToken.host'),
        type: this.configService.get('dbRegToken.type'),
        db: this.configService.get('dbRegToken'),
      },
      env: {
        DB_HOST: this.configService.get('DB_HOST'),
        APP_NAME: this.configService.get('APP_NAME'),
        NODE_ENV: process.env.NODE_ENV,
        env_DB_DATABASE: process.env.DB_DATABASE,
      },
    };
  }
}
