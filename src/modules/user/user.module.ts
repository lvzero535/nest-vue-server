import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleModule } from '../role/role.module';

@Module({
  /**
   * TypeOrmModule.forFeature，定义了当前模块中注册哪些存储库，这里传入的参数是实体（带有@Entity）
   * 这里传了UserEntity，可以在服务中使用@InjectRepository，注入User相关的实体
   */
  imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
