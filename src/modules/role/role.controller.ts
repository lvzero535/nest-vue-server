import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import {
  definePermission,
  Perm,
} from '../auth/decorators/permission.decorator';
export const permissions = definePermission('system:role', {
  LIST: 'list',
  DETAIL: 'detail',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
});
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Perm(permissions.LIST)
  list(@Query() query: { page: number; pageSize: number; search: string }) {
    return this.roleService.list(query);
  }

  @Post()
  @Perm(permissions.CREATE)
  create(@Body() roleDto: RoleDto) {
    return this.roleService.create(roleDto);
  }
  @Delete()
  @Perm(permissions.DELETE)
  delete(@Body('ids') ids: number[]) {
    return this.roleService.delete(ids);
  }
  @Get(':id')
  @Perm(permissions.DELETE)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
  @Put(':id')
  @Perm(permissions.UPDATE)
  updateRole(@Param('id') id: string, @Body() roleDto: RoleDto) {
    return this.roleService.update(id, roleDto);
  }
}
