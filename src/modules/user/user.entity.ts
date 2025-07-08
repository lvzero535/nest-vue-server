import { CommonEntity } from '@/common/entity/common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { DeptEntity } from '../dept/dept.entity';
import { FileEntity } from '../file-upload/file-upload.entity';

/**
 * @Entity 将当前类标记为实体，实体是一个被转化为数据库表的类
 * @param {string} | @param {EntityOptions.name} 将当前数据库表指定表名为 app_user
 *
 */
@Entity({ name: 'app_user' })
export class UserEntity extends CommonEntity {
  /**
   * @Column 将属性标记为表列
   * @param { unique } 默认为false，将列标记为唯一列（创建唯一约束）
   */
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  @OneToOne(() => FileEntity)
  // 一对一关系，维护关系的一侧
  @JoinColumn()
  avatar: FileEntity;

  @ManyToOne(() => DeptEntity, (dept) => dept.users)
  dept: DeptEntity;
}
