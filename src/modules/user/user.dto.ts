import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO（数据传输对象）是一个对象，它定义了如何通过网络发送数据
 */
export class UserDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  username: string;

  @ApiProperty({ description: '密码', example: '123456' })
  password: string;

  @ApiProperty({ description: '角色', type: [Number], example: [1, 2, 3] })
  roleIds: number[];

  @ApiProperty({ description: '部门', example: 1 })
  deptId: number;

  @ApiProperty({
    description: '头像',
    example: 'https://example.com/avatar.jpg',
  })
  avatar?: string;
}
