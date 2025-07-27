import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class PagerDto {
  @IsNumber()
  @ApiProperty({ description: '当前页码', example: 1 })
  page: number = 1;

  @IsNumber()
  @ApiProperty({ description: '每页数量', example: 10 })
  pageSize: number = 10;

  @ApiProperty({ description: '搜索关键字', required: false })
  @IsString()
  @IsOptional()
  search: string = '';
}
