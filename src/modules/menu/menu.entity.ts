import { CommonEntity } from '@/common/entity/common.entity';
import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';

export enum MenuTypeEnum {
  CATALOG = 0, // 目录
  MENU = 1, // 菜单
  BUTTON = 2, // 按钮
}

@Entity({ name: 'app_menu' })
@Tree('materialized-path')
export class MenuEntity extends CommonEntity {
  @Column({ unique: true })
  name: string;

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

  @TreeParent({ onDelete: 'SET NULL' })
  parent?: MenuEntity;

  @TreeChildren({ cascade: true })
  children: MenuEntity[];
}
