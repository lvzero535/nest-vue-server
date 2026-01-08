/**
 * DTO（数据传输对象）是一个对象，它定义了如何通过网络发送数据
 */
export class FileDto {
  originalName: string;
  filename: string;
  mimeType: string;
  size: number;
  userId: number;
  isTempFile: boolean;
}

export class FileInfo {
  fileHash: string;
  fileName: string;
  fileSize: number;
  lastModified?: number;
}

export class CheckReqInfo extends FileInfo {
  positions: number[];
  chunkSize: number;
  sampleChunkSize: number;
  totalChunks: number;
}

export type Status = 'complete' | 'partial' | 'initial';

export class CheckRespInfo {
  status: Status;
  uploaded: number[];
}

export class ChunkInfo extends FileInfo {
  index: number;
  chunk: Blob;
  chunkHash: string;
  chunkSize: number;
}

export class UploadRecordDto extends FileInfo {
  chunkSize: number;
  uploadedChunks: number[];
  status: 'uploading' | 'paused' | 'error';
  progress: number;
  createdAt: number;
  updatedAt: number;
}
