import { CommonEntity } from '@/common/entity/common.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'app_file' })
export class FileEntity extends CommonEntity {
  @Column()
  originalName: string;

  @Column()
  filename: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  userId: number;

  @Column({ default: true })
  isTempFile: boolean;
}
