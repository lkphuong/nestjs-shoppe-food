import { Injectable, NotFoundException } from '@nestjs/common';
import { DetailCartDto } from './dto/detailCart.dto';
import { DetailCartEntity } from './entity/detailCart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from '../carts/cart.service';
import { CartDto } from '../carts/dto/cart.dto';
import { ProductService } from '../products/product.service';
import { getConnection } from 'typeorm';

@Injectable()
export class DetailCartService {
  constructor(
    @InjectRepository(DetailCartEntity)
    private detailCartRepository: Repository<DetailCartEntity>,
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  async create(detailCartDto: any) {
    const product = await this.productService.getById(detailCartDto.product);
    const cart = await this.cartService.getById(detailCartDto.cart);
    if (product && cart) {
      const cartDto: CartDto = {
        amount: cart.amount + 1,
        total: cart.total + product.price,
      };
      const updateCart = await this.cartService.update(
        detailCartDto.cart,
        cartDto,
      );
      return await this.detailCartRepository.save(detailCartDto);
    }
    throw new NotFoundException();
  }

  async remove(detailCartDto: any) {
    const product = await this.productService.getById(detailCartDto.product);
    const cart = await this.cartService.getById(detailCartDto.cart);
    if (product && cart) {
      const cartDto: CartDto = {
        amount: cart.amount - 1,
        total: cart.total - product.price,
      };
      const updateCart = await this.cartService.update(
        detailCartDto.cart,
        cartDto,
      );
      return await this.detailCartRepository.delete(detailCartDto.id);
    }
    throw new NotFoundException();
  }

  async removeMultipleItem(idCart: number) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(DetailCartEntity)
      .where('cart = :cart', { cart: idCart })
      .execute();
  }

  async getByIdCart(idCart: number) {
    return await getConnection()
      .createQueryBuilder()
      .select('detail_cart_entity')
      .from(DetailCartEntity, 'detail_cart_entity')
      .where('detail_cart_entity.cartId = :cart', { cart: idCart });
  }
}
