import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity extends BaseEntity {
  /**
   * 创建一个自增的主键
   */
  @PrimaryGeneratedColumn()
  id: string;

  /**
   * @CreateDateColumn 特殊列，自动设置实体插入的时间。
   * 不需要手动写入该列的值。
   * 默认情况下数据库列名跟随属性名，通过name重新指定数据库的列名为created_at
   */
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  /**
   * @UpdateDateColumn 特殊列，每次从实体管理器或存储库调用save时，都会自动设置为实体更新的时间。
   * 不需要手动写入该列的值
   * 默认情况下数据库列名跟随属性名，通过name重新指定数据库的列名为updated_at
   */
  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
