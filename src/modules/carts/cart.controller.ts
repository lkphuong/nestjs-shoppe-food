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
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { CartDto } from './dto/cart.dto';
import { CartService } from './cart.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';
import { formatResponse } from 'src/common/utils/response/response';
import { REQUEST } from '@nestjs/core';
import { UserService } from '../users/user.service';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    @Inject(REQUEST) private request: any, // private userService: UserService,
  ) {}

  @Roles(ROLE.MASTER)
  @Get()
  @HttpCode(200)
  async getAll() {
    const carts = await this.cartService.getAll();
    return formatResponse(carts, 0, '', []);
  }

  @Roles(ROLE.USER)
  @Get('getMyCart')
  @HttpCode(200)
  async getMyCart() {
    const user = await this.request.user;
    const cart = await this.cartService.getById(user.id);
    return formatResponse(cart, 0, '', []);
  }

  @Roles(ROLE.MASTER)
  @Post()
  @HttpCode(201)
  async create(@Body() cartDto: CartDto) {
    return await this.cartService.create(cartDto);
  }

  @Roles(ROLE.MASTER)
  @Put('updateById/:id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cartDto: CartDto,
  ) {
    await this.cartService.update(id, cartDto);
    return await this.cartService.getById(id);
  }

  @Roles(ROLE.MASTER)
  @Delete('deleteById/:id')
  @HttpCode(200)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.remove(id);
  }
}
