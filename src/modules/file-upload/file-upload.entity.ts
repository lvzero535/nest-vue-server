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

@Entity({ name: 'app_file_upload_record' })
export class UploadRecordEntity extends CommonEntity {
  @Column()
  fileHash: string;

  @Column()
  fileName: string;

  @Column({ type: 'bigint' })
  fileSize: number;

  @Column({ type: 'bigint' })
  lastModified: number;

  @Column()
  chunkSize: number;

  @Column()
  totalChunks: number;

  @Column()
  status: 'complete' | 'partial' | 'initial';

  @Column()
  userId: number;
}

@Entity({ name: 'app_file_upload_chunk' })
export class UploadChunkEntity extends CommonEntity {
  @Column()
  fileHash: string;

  @Column()
  fileName: string;

  @Column({ type: 'bigint' })
  fileSize: number;

  @Column({ type: 'bigint' })
  lastModified: number;

  @Column()
  chunkSize: number;

  @Column()
  index: number;

  @Column()
  chunkHash: string;
}
