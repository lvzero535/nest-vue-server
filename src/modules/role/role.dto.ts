import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO（数据传输对象）是一个对象，它定义了如何通过网络发送数据
 */
export class RoleDto {
  @ApiProperty({ description: '角色名称' })
  name: string;

  @ApiProperty({ description: '角色值' })
  value: string;

  @ApiProperty({ description: '角色描述' })
  remark: string;

  @ApiProperty({ description: '角色状态' })
  status: boolean;

  @ApiProperty({ description: '菜单ID列表', type: [Number] })
  menuIds: number[];
}
