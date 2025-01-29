import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { MenuEntity } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuDto } from './menu.dto';
import { listToTree } from '@/helper/tree';
import { isEmpty } from 'lodash';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async findAllTree(isTree = true) {
    const list = await this.menuRepository.find();
    return {
      list: isTree ? listToTree(list) : list,
      total: list.length,
    };
  }
  async findAllList() {
    return this.findAllTree(false);
  }

  async createPermButtons(body: MenuDto) {
    const permissions = body.permission.split(',');
    const existButtonPerm = await this.menuRepository.find({
      where: {
        parentId: body.parentId,
        permission: In(permissions),
      },
    });
    console.log('permissions ===>', existButtonPerm);
    if (!isEmpty(existButtonPerm)) {
      throw new BusinessException(ErrorCodeEnum.PERM_EXIST_IN_MENU);
    }
    const names = body.name.split(',');
    const menus = permissions.map((per, index) => {
      return {
        ...body,
        permission: per,
        name: names[index],
      };
    });
    return await this.menuRepository.save(menus);
  }

  async create(body: MenuDto) {
    // 权限可以批量创建，单独操作
    if (body.type === 2) {
      return this.createPermButtons(body);
    }
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

  async findMenuByIds(ids: number[]) {
    return await this.menuRepository.findBy({
      id: In(ids),
    });
  }
  async findMenuByRoleIds(ids: number[]) {
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

  async getPermissions(roleIds: number[]) {
    // 如果roleIds为空，返回空数组
    // 如果roleIds为空，走数据库查询会报错
    if (isEmpty(roleIds)) return [];
    const list = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.roles', 'role')
      .andWhere('role.id IN (:...ids)', { ids: roleIds })
      .andWhere('menu.type IN (2)')
      .andWhere('menu.permission IS NOT NULL')
      .getMany();
    return list.map((i) => i.permission);
  }
}
