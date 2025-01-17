import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCodeEnum } from '@/constants/error-code.constant';
import { isEmpty } from 'lodash';
import { RoleService } from '../role/role.service';

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
  ) {}

  async findAllUsers({
    page,
    pageSize,
    search,
  }): Promise<{ list: UserEntity[]; total: number }> {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .where({
        username: Like(`%${search}%`),
      })
      .leftJoinAndSelect('user.roles', 'role')
      .orderBy('user.createAt', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

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
    const roles = isEmpty(userDto.roleIds)
      ? []
      : await this.roleService.findRoleByIds(userDto.roleIds);
    return this.usersRepository.save({
      ...userDto,
      roles,
    });
  }
  delete(id: number[]) {
    return this.usersRepository.delete(id);
  }
  async update(id: string, userDto: UserDto) {
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
  findOne(id: string) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['roles'],
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
}
