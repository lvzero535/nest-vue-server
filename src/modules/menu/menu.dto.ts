import { ApiProperty } from '@nestjs/swagger';

export class MenuDto {
  @ApiProperty({ description: '菜单名称', example: '菜单名称' })
  name: string;

  @ApiProperty({ description: '菜单类型', example: 1 })
  type: number;

  @ApiProperty({ description: '菜单路径', example: '/menu' })
  path: string;

  @ApiProperty({ description: '菜单图标', example: 'icon-menu' })
  icon?: string;

  @ApiProperty({ description: '菜单排序', example: 1 })
  order?: number;

  @ApiProperty({ description: '菜单状态', example: true })
  status?: boolean;

  @ApiProperty({ description: '父菜单ID', example: 1 })
  parentId?: number;

  @ApiProperty({ description: '权限', example: 'system:menu:list' })
  permission?: string;
}
