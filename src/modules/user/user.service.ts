import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';
import { isEmpty } from 'lodash';
import { RoleService } from '../role/role.service';
import { DeptService } from '../dept/dept.service';

@Injectable()
export class UserService {
  /**
   * @InjectRepository(UserEntity) 注入User的存储库到服务里
   * @param usersRepository 存储库
   */
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private roleService: RoleService,
    private deptService: DeptService,
  ) {}

  async findAllUsers({
    page,
    pageSize,
    search,
    deptId,
  }): Promise<{ list: UserEntity[]; total: number }> {
    console.log('deptId ===> ', deptId);
    const dept = await this.deptService.findDescendant(deptId);
    console.log(dept);
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      // https://github.com/typeorm/typeorm/issues/3941#issuecomment-480290531
      .addSelect(
        `CASE WHEN user.username = 'admin' THEN 1 ELSE 2 END`,
        'default_sort',
      )
      .where({
        username: Like(`%${search}%`),
      })
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('user.dept', 'dept')
      .orderBy('default_sort') // 使用addSelect里的语句先排序
      .addOrderBy('user.createAt', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (!isEmpty(dept)) {
      queryBuilder.andWhere('user.deptId IN (:...ids)', {
        ids: dept.map((dept) => dept.id),
      });
    }

    const [list, total] = await queryBuilder.getManyAndCount();
    return {
      list,
      total,
    };
  }
  async create(userDto: UserDto) {
    const user = await this.findUserByUserName(userDto.username, false);
    if (user) {
      throw new BusinessException(ErrorCodeEnum.DUPLICATE_RECORD);
    }

    const dept = await this.deptService.findOne(userDto.deptId);

    const roles = isEmpty(userDto.roleIds)
      ? []
      : await this.roleService.findRoleByIds(userDto.roleIds);
    return this.usersRepository.save({
      ...userDto,
      dept,
      roles,
    });
  }
  delete(id: number[]) {
    return this.usersRepository.delete(id);
  }
  async update(id: number, userDto: UserDto) {
    const user = await this.findOne(id);
    // const user = this.findOne(id);
    const roles = isEmpty(userDto.roleIds)
      ? []
      : await this.roleService.findRoleByIds(userDto.roleIds);

    user.roles = roles;
    return this.usersRepository.save({
      ...user,
      ...userDto,
    });
  }
  findOne(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['roles', 'dept'],
    });
  }
  findUserByUserName(username: string, withRoles = true) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
      relations: withRoles ? ['roles'] : [],
    });
  }

  async getAccountInfo(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BusinessException(ErrorCodeEnum.INVALID_LOGIN);
    }
    delete user.password;
    return user;
  }
}
