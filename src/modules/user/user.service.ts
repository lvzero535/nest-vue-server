import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  /**
   * @InjectRepository(UserEntity) 注入User的存储库到服务里
   * @param usersRepository 存储库
   */
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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
      .orderBy('user.createAt', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [list, total] = await queryBuilder.getManyAndCount();
    return {
      list,
      total,
    };
  }
  create(userDto: UserDto) {
    return this.usersRepository.save(userDto);
  }
  delete(id: number) {
    return this.usersRepository.delete(id);
  }
  update(id: string, userDto: UserDto) {
    // const user = this.findOne(id);
    return this.usersRepository.update(id, {
      // ...user,
      ...userDto,
    });
  }
  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }
}
