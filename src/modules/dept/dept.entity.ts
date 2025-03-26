import { CommonEntity } from '@/common/entity/common.entity';
import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'app_dept' })
@Tree('materialized-path')
export class DeptEntity extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @TreeParent({ onDelete: 'SET NULL' })
  parent?: DeptEntity;

  @TreeChildren({ cascade: true })
  children: DeptEntity[];

  @OneToMany(() => UserEntity, (user) => user.dept)
  users: UserEntity[];
}
