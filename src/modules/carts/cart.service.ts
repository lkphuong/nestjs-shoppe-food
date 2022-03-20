import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entity/cart.entity';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async getAll(): Promise<CartEntity[]> {
    return await this.cartRepository.find({
      take: 10,
      relations: ['detailCarts', 'detailCarts.product'],
    });
  }

  async getById(id: number): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne(id, {
      relations: ['detailCarts'],
    });
    if (cart) {
      return cart;
    }
    throw new NotFoundException();
  }

  async create(cartDto: CartDto) {
    return await this.cartRepository.save(cartDto);
  }

  async update(id: number, cartDto: Partial<CartDto>) {
    const cart = await this.cartRepository.findOne(id);
    if (cart) {
      return await this.cartRepository.update(id, cartDto);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const cart = await this.cartRepository.findOne(id);
    if (cart) {
      return await this.cartRepository.delete(id);
    }
    throw new NotFoundException();
  }

  async reset(id: number) {
    const cartDto: CartDto = {
      total: 0,
      amount: 0,
    };
    return await this.cartRepository.update(id, cartDto);
  }
}
