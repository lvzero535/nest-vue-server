import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  msg: string;

  data: TData[];
}
