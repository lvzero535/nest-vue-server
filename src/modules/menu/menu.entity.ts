import { CommonEntity } from '@/common/entity/common.entity';
import { Column, Entity, ManyToMany, Relation } from 'typeorm';
import { RoleEntity } from '../role/role.entity';

export enum MenuTypeEnum {
  CATALOG = 0, // 目录
  MENU = 1, // 菜单
  BUTTON = 2, // 按钮
}

@Entity({ name: 'app_menu' })
export class MenuEntity extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string;

  @Column({
    type: 'enum',
    enum: MenuTypeEnum,
    default: MenuTypeEnum.MENU,
  })
  type: number;

  /* 权限标识 */
  @Column({ nullable: true })
  permission: string;

  /* 菜单路由 */
  @Column({ nullable: true })
  path: string;

  /* 菜单图标 */
  @Column({ nullable: true })
  icon: string;

  /* 排序显示 */
  @Column({ default: 0 })
  order: number;

  /* 是否启用 */
  @Column({ default: true })
  status: boolean;
  /**
   * Relation, ESM中避免循环依赖 https://www.typeorm.org/#%E5%9C%A8-esm-%E9%A1%B9%E7%9B%AE%E4%B8%AD%E7%9A%84%E5%85%B3%E7%B3%BB
   * @param cascade 级联删除
   */
  @ManyToMany(() => RoleEntity, (role) => role.menus, {
    onDelete: 'CASCADE',
  })
  roles: Relation<RoleEntity[]>;
}
