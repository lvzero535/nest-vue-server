import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from '@/config';
import { DatabaseModule } from '@/shared/database/database.module';
import { UserModule } from '@/modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { DeptModule } from '@/modules/dept/dept.module';
import { MenuModule } from '@/modules/menu/menu.module';
import { RoleModule } from '@/modules/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      /**
       * 存在相同变量时，运行时环境变量优先级最高
       * 然后按数据顺序优先级，前面的最高
       */
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      /**
       * 注册为全局模块，这样可以在所有模板中不引用ConfigModule，也可以使用ConfigService
       */
      isGlobal: true,
      /**
       * 支持环境变更扩展。可以创建嵌套的环境变更，其中一个变量在另一个变量的定义中引用。
       * expandVariables 为 true中开启
       */
      expandVariables: true,
      load: [...Object.values(config)],
    }),
    DatabaseModule,
    UserModule,
    DeptModule,
    MenuModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      /* 全局拦截器 */
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
