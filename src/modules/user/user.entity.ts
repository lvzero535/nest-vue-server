import { CommonEntity } from '@/common/entity/common.entity';
import { Column, Entity } from 'typeorm';

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
}
