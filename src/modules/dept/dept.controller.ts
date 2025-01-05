import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptDto } from './dept.dto';

@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get()
  getList() {
    return this.deptService.findAll();
  }

  @Post()
  create(@Body() body: DeptDto) {
    return this.deptService.create(body);
  }
}
