import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { bcryptSalt } from 'src/config/bcrypt/bcrypt';
import * as bcrypt from 'bcrypt';
import { TokenDto } from './dto/token.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const user = await this.userRepository.find({ take: 20 });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async getById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async getByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ username: username });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  async create(userDto: UserDto) {
    userDto.password = await bcrypt.hash(userDto.password, bcryptSalt.salt);
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
      await this.userRepository.update(id, tokenDto);
    }
    throw new NotFoundException();
  }

  async findByRefreshToken(token: string) {
    const user = await this.userRepository.findOne({ refreshToken: token });
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }
}