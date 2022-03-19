import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from './entity/menu.entity';
import { MenuDto } from './dto/menu.dto';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
  ) {}

  async getAll(): Promise<MenuEntity[]> {
    return await this.menuRepository.find({
      take: 20,
      relations: ['shop', 'products'],
    });
  }

  async getById(id: number): Promise<MenuEntity> {
    const menu = await this.menuRepository.findOne(id, {
      relations: ['shop', 'products'],
    });
    if (menu) {
      return menu;
    }
    throw new NotFoundException();
  }

  async create(menuDto: MenuDto) {
    return await this.menuRepository.save(menuDto);
  }

  async update(id: number, menuDto: Partial<MenuDto>) {
    const menu = await this.menuRepository.findOne(id);
    if (menu) {
      return await this.menuRepository.update(id, menuDto);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const menu = await this.menuRepository.findOne(id);
    if (menu) {
      return await this.menuRepository.delete(id);
    }
    throw new NotFoundException();
  }
}
