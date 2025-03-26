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

export const permissions = definePermission('system:user', {
  LIST: 'list',
  DETAIL: 'detail',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
});

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
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
