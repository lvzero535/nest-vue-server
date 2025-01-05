import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MenuModule } from '../menu/menu.module';

@Module({
  /**
   * TypeOrmModule.forFeature，定义了当前模块中注册哪些存储库，这里传入的参数是实体（带有@Entity）
   * 这里传了RoleEntity，可以在服务中使用@InjectRepository，注入Role相关的实体
   */
  imports: [TypeOrmModule.forFeature([RoleEntity]), MenuModule],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
