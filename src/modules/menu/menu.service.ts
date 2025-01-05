import { Injectable } from '@nestjs/common';
import { In, TreeRepository } from 'typeorm';
import { MenuEntity } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuDto } from './menu.dto';
import { traverseTree } from '@/helper/tree';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: TreeRepository<MenuEntity>,
  ) {}

  async findAll() {
    const list = await this.menuRepository.findTrees({
      relations: ['parent'],
    });
    return {
      list: traverseTree(list, (node: MenuEntity) => {
        if (!node.children.length) {
          node.children = null;
        }
      }),
      total: list.length,
    };
  }

  async create(body: MenuDto) {
    const parent = await this.menuRepository.findOne({
      where: { id: body.parentId },
    });
    return await this.menuRepository.save({
      ...body,
      parent,
    });
  }

  delete(ids: MenuEntity['id'][]) {
    return this.menuRepository.delete(ids);
  }

  async update(id: MenuEntity['id'], body: MenuDto) {
    const parent = await this.menuRepository.findOne({
      where: { id: body.parentId },
    });
    return await this.menuRepository.update(id, {
      ...body,
      parent,
    });
  }
  async findOne(id: MenuEntity['id']) {
    return await this.menuRepository.findOne({
      where: { id },
      relations: ['parent'],
    });
  }

  async findMenuByIds(ids: MenuEntity['id'][]) {
    return await this.menuRepository.findBy({
      id: In(ids),
    });
  }
}
