import { Injectable } from '@nestjs/common';
import { Repository, TreeRepository } from 'typeorm';
import { DeptEntity } from './dept.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeptDto } from './dept.dto';
import { isNil, omit } from 'lodash';
import { traverseTree } from '@/helper/tree';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(DeptEntity)
    private readonly deptTreeRepository: TreeRepository<DeptEntity>,
    @InjectRepository(DeptEntity)
    private readonly deptRepository: Repository<DeptEntity>,
  ) {}

  async findAll() {
    const list = await this.deptTreeRepository.findTrees();
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
    const parent = isNil(body.parentId)
      ? null
      : await this.deptTreeRepository.findOne({
          where: { id: body.parentId },
        });
    return await this.deptTreeRepository.save({
      ...omit(body, ['parentId']),
      parent,
    });
  }

  async update(id: number, body: DeptDto) {
    const parent = await this.deptTreeRepository.findOne({
      where: { id: body.parentId },
    });
    return await this.deptTreeRepository.save({
      id,
      ...omit(body, ['parentId']),
      parent,
    });
  }
  async delete(ids: number[]) {
    return await this.deptTreeRepository.delete(ids);
  }

  async findOne(id: number) {
    const dept = await this.deptRepository.findOne({
      where: { id },
      relations: {
        parent: true,
      },
    });
    return {
      ...omit(dept, ['parent']),
      parentId: dept.parent?.id ?? null,
    };
  }
  async findDescendant(id: number) {
    const dept = await this.deptTreeRepository.findOne({
      where: { id },
    });
    if (!dept) {
      return [];
    }
    const children = await this.deptTreeRepository.findDescendants(dept);
    return children;
  }
}
