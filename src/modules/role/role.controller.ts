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

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAllRoles(
    @Query() query: { page: number; pageSize: number; search: string },
  ) {
    return this.roleService.findAllRoles(query);
  }

  @Post()
  create(@Body() roleDto: RoleDto) {
    return this.roleService.create(roleDto);
  }
  @Delete()
  delete(@Body('ids') ids: number[]) {
    return this.roleService.delete(ids);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
  @Put(':id')
  updateRole(@Param('id') id: string, @Body() roleDto: RoleDto) {
    return this.roleService.update(id, roleDto);
  }
}
