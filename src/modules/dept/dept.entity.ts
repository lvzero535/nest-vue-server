import { CommonEntity } from '@/common/entity/common.entity';
import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity({ name: 'app_dept' })
@Tree('materialized-path')
export class DeptEntity extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @TreeParent({ onDelete: 'SET NULL' })
  parent?: DeptEntity;

  @TreeChildren({ cascade: true })
  children: DeptEntity[];
}
