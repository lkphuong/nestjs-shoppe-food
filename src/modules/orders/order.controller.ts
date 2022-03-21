import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Inject,
  ForbiddenException,
  Body,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { CartService } from '../carts/cart.service';
import { DetailCartService } from '../detailCarts/detailCart.service';
import { DetailOrderSerive } from '../detailOrders/detailOrder.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';
import { REQUEST } from '@nestjs/core';
import { formatResponse } from '../../common/utils/response/response';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private detailCartService: DetailCartService,
    private detaiOrderService: DetailOrderSerive,
    @Inject(REQUEST) private request: any,
  ) {}

  @Roles(ROLE.MASTER)
  @HttpCode(200)
  @Get()
  async getAll() {
    const orders = await this.orderService.getAll();
    return formatResponse(orders, 0, '', []);
  }

  @Roles(ROLE.USER)
  @HttpCode(200)
  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.request.user;
    const order = await this.orderService.getById(id);
    if (user.id == order.user.id || ROLE.MASTER) {
      return formatResponse(order, 0, '', []);
    }
    throw new ForbiddenException();
  }

  @Roles(ROLE.USER)
  @HttpCode(201)
  @Post()
  async create(@Body() orderDto: any) {
    const user = await this.request.user;
    const cart = await this.cartService.getById(user.id);
    orderDto = {
      total: cart.total,
      amount: cart.amount,
      user: user.id,
    };
    const order = await this.orderService.create(orderDto);
    const detailCart = await this.detailCartService.getByIdCart(user.id);

    const cartFormated = detailCart.map((item) => {
      return {
        ...item,
        order: order.id,
        product: item.product.id,
      };
    });
    const detailOrder = await this.detaiOrderService.create(cartFormated);
    await this.cartService.reset(user.id);
    await this.detailCartService.removeMultipleItem(user.id);
    return formatResponse(order, 0, '', []);
  }

  @Roles(ROLE.MASTER)
  @HttpCode(409)
  @Put('updateById/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderDto: OrderDto,
  ) {
    const order = await this.orderService.update(id, orderDto);
    return formatResponse(order, 0, '', []);
  }

  @Roles(ROLE.MASTER)
  @HttpCode(404)
  @Delete('deleteById/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.orderService.remove(id);
    return formatResponse({}, 0, '', []);
  }
}
