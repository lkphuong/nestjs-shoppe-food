import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopEntity } from './entity/shop.entity';
import { ShopDto } from './dto/shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private shopRepository: Repository<ShopEntity>,
  ) {}

  async getAll(): Promise<ShopEntity[]> {
    const shops = await this.shopRepository.find({
      take: 20,
      relations: ['menus', 'menus.products'],
    });
    return shops;
  }

  async getbyId(id: number): Promise<ShopEntity> {
    const shop = await this.shopRepository.findOne(id, {
      relations: ['menus', 'menus.products'],
    });
    if (shop) {
      return shop;
    }
    throw new NotFoundException();
  }

  async create(shopDto: ShopDto) {
    return await this.shopRepository.save(shopDto);
  }

  async update(id: number, shopDto: Partial<ShopDto>) {
    const shop = await this.shopRepository.findOne(id);
    if (shop) {
      return await this.shopRepository.update(id, shopDto);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const shop = await this.shopRepository.findOne(id);
    if (shop) {
      return await this.shopRepository.delete(id);
    }
    throw new NotFoundException();
  }
}
