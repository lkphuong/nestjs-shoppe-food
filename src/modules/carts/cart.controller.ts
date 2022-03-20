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
} from '@nestjs/common';
import { CartDto } from './dto/cart.dto';
import { CartService } from './cart.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';
import { formatResponse } from 'src/common/utils/response/response';
import { REQUEST } from '@nestjs/core';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Roles(ROLE.MASTER)
  @Get()
  @HttpCode(200)
  async getAll() {
    const carts = await this.cartService.getAll();
    return formatResponse(carts, 0, '', []);
  }

  @Roles(ROLE.USER)
  @Get('getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.getById(id);
  }

  @Roles()
  @Post()
  @HttpCode(201)
  async create(@Body() cartDto: CartDto) {
    return await this.cartService.create(cartDto);
  }

  @Roles()
  @Put('updateById/:id')
  @HttpCode(409)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cartDto: CartDto,
  ) {
    await this.cartService.update(id, cartDto);
    return await this.cartService.getById(id);
  }

  @Roles(ROLE.MASTER)
  @Delete('deleteById/:id')
  @HttpCode(404)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.remove(id);
  }
}
