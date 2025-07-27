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
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import {
  definePermission,
  Perm,
} from '../auth/decorators/permission.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

export const permissions = definePermission('system:user', {
  LIST: 'list',
  DETAIL: 'detail',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
});

// 这是给用户管理模块的 API 文档添标题，如果不写这个，默认为Controller里的参数 User
@ApiTags('System - 用户管理')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: '页码（从1开始）',
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: true,
    type: Number,
    description: '每页数量',
    example: 10,
  })
  @ApiQuery({
    name: 'deptId',
    required: true,
    type: Number,
    description: '部门ID',
    example: -1,
  })
  @Get()
  @ApiOperation({ summary: '用户列表' })
  @Perm(permissions.LIST)
  findAllUsers(
    @Query()
    query: {
      page: number;
      pageSize: number;
      search: string;
      deptId: number;
    },
  ) {
    return this.userService.findAllUsers(query);
  }

  @Post()
  @Perm(permissions.CREATE)
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
  @Delete()
  @Perm(permissions.DELETE)
  delete(@Body('ids') ids: number[]) {
    return this.userService.delete(ids);
  }
  @Get(':id')
  @Perm(permissions.DETAIL)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Put(':id')
  @Perm(permissions.UPDATE)
  updateUser(@Param('id') id: number, @Body() userDto: UserDto) {
    return this.userService.update(id, userDto);
  }
}
