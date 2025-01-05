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

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get()
  getList() {
    return this.menuService.findAll();
  }

  @Post()
  create(@Body() body: MenuDto) {
    return this.menuService.create(body);
  }

  @Delete()
  delete(@Body('ids') ids: string[]) {
    return this.menuService.delete(ids);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: MenuDto) {
    return this.menuService.update(id, body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }
}
