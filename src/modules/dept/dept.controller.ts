import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptDto } from './dept.dto';
import {
  definePermission,
  Perm,
} from '../auth/decorators/permission.decorator';
export const permissions = definePermission('system:dept', {
  LIST: 'list',
  DETAIL: 'detail',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
});
@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get()
  @Perm(permissions.LIST)
  getList() {
    return this.deptService.findAll();
  }

  @Post()
  @Perm(permissions.CREATE)
  create(@Body() body: DeptDto) {
    return this.deptService.create(body);
  }

  @Put(':id')
  @Perm(permissions.UPDATE)
  update(@Param('id') id: number, @Body() body: DeptDto) {
    return this.deptService.update(id, body);
  }

  @Delete()
  @Perm(permissions.DELETE)
  delete(@Body('ids') ids: number[]) {
    return this.deptService.delete(ids);
  }

  @Get(':id')
  @Perm(permissions.DETAIL)
  findOne(@Param('id') id: number) {
    return this.deptService.findOne(id);
  }
}
