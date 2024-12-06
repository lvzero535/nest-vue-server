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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUsers(
    @Query() query: { page: number; pageSize: number; search: string },
  ) {
    return this.userService.findAllUsers(query);
  }

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.update(id, userDto);
  }
}
