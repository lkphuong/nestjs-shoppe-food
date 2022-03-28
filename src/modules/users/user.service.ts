import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { TokenDto } from './dto/token.dto';
import { formatUser } from 'src/common/utils/format/userFormated';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const user = await this.userRepository.find({
      take: 20,
      relations: ['group', 'cart'],
    });
    if (user) {
      return formatUser(user);
    }
    throw new NotFoundException();
  }

  async getById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id, {
      relations: ['group', 'cart'],
    });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async getByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { username: username },
      { relations: ['group'] },
    );
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async create(userDto: any) {
    userDto.password = await bcrypt.hash(userDto.password, process.env.SALT);
    userDto.username = userDto.username.replace(/\s/g, '');
    return await this.userRepository.save(userDto);
  }

  async update(id: number, userDto: Partial<UserDto>) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return await this.userRepository.update(id, userDto);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return await this.userRepository.delete(id);
    }
    throw new NotFoundException();
  }

  async refreshToken(id: number, tokenDto: Partial<TokenDto>) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return await this.userRepository.update(id, tokenDto);
    }
    throw new NotFoundException();
  }

  async findByRefreshToken(token: string) {
    const user = await this.userRepository.findOne(
      {
        refreshToken: token,
      },
      { relations: ['group'] },
    );
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async removeRefreshToken(id: number) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return await getRepository(UserEntity)
        .createQueryBuilder('user')
        .update(UserEntity)
        .set({
          refreshToken: '',
        })
        .where('id = :id', { id: id })
        .execute();
    }
    throw new NotFoundException();
  }
}
