import { Injectable } from '@nestjs/common';
import { In, Like, Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from './role.dto';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';
import { MenuService } from '../menu/menu.service';
import { isEmpty } from 'lodash';

@Injectable()
export class RoleService {
  /**
   * @InjectRepository(RoleEntity) 注入Role的存储库到服务里
   * @param rolesRepository 存储库
   */
  constructor(
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
    private readonly menuService: MenuService,
  ) {}

  async list({
    page,
    pageSize,
    search,
  }): Promise<{ list: RoleEntity[]; total: number }> {
    const queryBuilder = this.rolesRepository
      .createQueryBuilder('role')
      // https://github.com/typeorm/typeorm/issues/3941#issuecomment-480290531
      .addSelect(
        `CASE WHEN role.name = 'admin' THEN 1 ELSE 2 END`,
        'default_sort',
      )
      /* 第一个参数是您要加载的关联关系，第二个参数是您为该关联关系的表分配的别名。 */
      .leftJoinAndSelect('role.menus', 'menu')
      .where({
        name: Like(`%${search ? search : ''}%`),
      })
      .orderBy('default_sort')
      .addOrderBy('role.createAt', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [list, total] = await queryBuilder.getManyAndCount();
    return {
      list,
      total,
    };
  }
  async create(roleDto: RoleDto) {
    const role = await this.rolesRepository.findOneBy({
      name: roleDto.name,
    });
    if (role) {
      throw new BusinessException(ErrorCodeEnum.DUPLICATE_RECORD);
    }
    const menus = isEmpty(roleDto.menuIds)
      ? []
      : await this.menuService.findMenuByIds(roleDto.menuIds);
    return this.rolesRepository.save({
      ...roleDto,
      menus,
    });
  }
  delete(id: number[]) {
    return this.rolesRepository.delete(id);
  }
  /**
   * 更新角色, 使用update方法更新角色时会报错
   * Cannot query across many-to-many for property menus
   * @param id
   * @param roleDto
   */
  async update(id: number, roleDto: RoleDto) {
    const role = await this.findOne(id);
    // const role = this.findOne(id);
    const menus = isEmpty(roleDto.menuIds)
      ? []
      : await this.menuService.findMenuByIds(roleDto.menuIds);

    role.menus = menus;
    return this.rolesRepository.save({
      ...role,
      ...roleDto,
    });
  }
  findOne(id: number) {
    return this.rolesRepository.findOne({
      where: {
        id,
      },
      relations: ['menus'],
    });
  }

  async findAdminRole(id: number) {
    const menus = await this.menuService.findAllList();
    const role = await this.rolesRepository.findOneBy({
      id,
    });
    return {
      ...role,
      menus: menus.list,
    };
  }

  findRoleByIds(ids: number[]) {
    return this.rolesRepository.findBy({
      id: In(ids),
    });
  }
}
