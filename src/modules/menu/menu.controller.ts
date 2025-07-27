import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDto } from './menu.dto';
import {
  definePermission,
  getAllDefinePermissions,
  Perm,
} from '../auth/decorators/permission.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const permissions = definePermission('system:menu', {
  LIST: 'list',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  EXPORT: 'export',
  IMPORT: 'import',
  DETAIL: 'detail',
});

@ApiTags('System - 菜单')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @Perm(permissions.LIST)
  getList() {
    return this.menuService.findAllTree();
  }

  @Post()
  @Perm(permissions.CREATE)
  create(@Body() body: MenuDto) {
    return this.menuService.create(body);
  }

  @Delete()
  @Perm(permissions.DELETE)
  delete(@Body('ids') ids: number[]) {
    return this.menuService.delete(ids);
  }

  @Put(':id')
  @Perm(permissions.UPDATE)
  update(@Param('id') id: number, @Body() body: MenuDto) {
    return this.menuService.update(id, body);
  }

  /**
   * 获取所有权限
   * 这个操作不能放到findOne函数后面, 放到后面会被 /menu/:id 路径拦截, 当成 /menu/permissions
   */
  @Get('permissions')
  async getPermissions(): Promise<string[]> {
    return getAllDefinePermissions();
  }

  @Get(':id')
  @Perm(permissions.DETAIL)
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }
}
