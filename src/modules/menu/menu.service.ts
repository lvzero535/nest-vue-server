import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { MenuEntity } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuDto } from './menu.dto';
import { RoleEntity } from '../role/role.entity';
import { listToTree } from '@/helper/tree';
import { isEmpty } from 'lodash';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async findAll() {
    const list = await this.menuRepository.find();
    return {
      list: listToTree(list),
      total: list.length,
    };
  }

  async create(body: MenuDto) {
    return await this.menuRepository.save(body);
  }

  delete(ids: MenuEntity['id'][]) {
    return this.menuRepository.delete(ids);
  }

  async update(id: MenuEntity['id'], body: MenuDto) {
    return await this.menuRepository.update(id, body);
  }

  async findOne(id: MenuEntity['id']) {
    return await this.menuRepository.findOne({
      where: { id },
    });
  }

  async findMenuByIds(ids: MenuEntity['id'][]) {
    return await this.menuRepository.findBy({
      id: In(ids),
    });
  }
  async findMenuByRoleIds(ids: RoleEntity['id'][]) {
    const list = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.roles', 'role')
      .andWhere('role.id IN (:...ids)', { ids })
      .getMany();

    return {
      list: listToTree(list),
      total: list.length,
    };
  }

  async getPermissions(ids: string[]) {
    const list = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.roles', 'role')
      .andWhere('role.id IN (:...ids)', { ids })
      .andWhere('menu.type IN (2)')
      .andWhere('menu.permission IS NOT NULL')
      .getMany();
    if (isEmpty(list)) return [];
    return list.map((i) => i.permission);
  }
}
