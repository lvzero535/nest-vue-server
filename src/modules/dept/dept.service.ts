import { Injectable } from '@nestjs/common';
import { TreeRepository } from 'typeorm';
import { DeptEntity } from './dept.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeptDto } from './dept.dto';
import { omit } from 'lodash';
import { traverseTree } from '@/helper/tree';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(DeptEntity)
    private readonly deptRepository: TreeRepository<DeptEntity>,
  ) {}

  async findAll() {
    const list = await this.deptRepository.findTrees();
    return {
      list: traverseTree(list, (node: DeptEntity) => {
        if (!node.children.length) {
          node.children = null;
        }
      }),
      total: list.length,
    };
  }

  async create(body: DeptDto) {
    const parent = await this.deptRepository.findOne({
      where: { id: body.parentId },
    });
    return await this.deptRepository.save({
      ...omit(body, ['parentId']),
      parent,
    });
  }
}
