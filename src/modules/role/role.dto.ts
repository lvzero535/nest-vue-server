/**
 * DTO（数据传输对象）是一个对象，它定义了如何通过网络发送数据
 */
export class RoleDto {
  name: string;
  value: string;
  remark: string;
  status: boolean;
  menuIds: number[];
}
