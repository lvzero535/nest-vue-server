import { ApiProperty } from '@nestjs/swagger';

export class DeptDto {
  @ApiProperty({ description: '部门名称', example: '部门名称' })
  name: string;

  @ApiProperty({ description: '父部门ID', example: -1 })
  parentId?: number;
}
