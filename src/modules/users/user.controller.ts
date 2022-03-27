import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Body,
  Inject,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { formatResponse } from 'src/common/utils/response/response';
import { UserDto } from './dto/user.dto';
import { REQUEST } from '@nestjs/core';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';
import { Public } from 'src/auth/setMetadata';
import { CartService } from '../carts/cart.service';
import { CartDto } from '../carts/dto/cart.dto';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private cartService: CartService,
    @Inject(REQUEST) private request: any,
  ) {}

  @Roles(ROLE.MASTER)
  @Get()
  @HttpCode(200)
  async getAll() {
    const data = await this.userService.getAll();
    return formatResponse(data, 0, 'success', []);
  }

  @Roles(ROLE.USER)
  @Get('/getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.request.user;
    if (user.id === id || user.role === ROLE.MASTER) {
      const data = await this.userService.getById(id);
      return formatResponse(data, 0, 'success', []);
    }
    throw new ForbiddenException();
  }

  @Roles(ROLE.USER)
  @Get('/getByUsername/:username')
  @HttpCode(200)
  async getByUsername(@Param('username') username: string) {
    const user = await this.request.user;
    if (user.username === username || user.role === ROLE.MASTER) {
      const data = await this.userService.getByUsername(username);
      return formatResponse(data, 0, 'success', []);
    }
    throw new ForbiddenException();
  }

  @Public()
  @Post()
  @HttpCode(201)
  async create(@Body() userDto: any) {
    const cartDto: CartDto = {
      total: 0,
      amount: 0,
    };
    await this.cartService
      .create(cartDto)
      .then(async (cart) => {
        userDto.cart = cart.id;
        userDto.group = 1;
        await this.userService
          .create(userDto)
          .then((user) => {
            return formatResponse(user, 0, 'success', []);
          })
          .catch(() => {
            throw new BadRequestException();
          });
      })
      .catch(() => {
        throw new BadRequestException();
      });
  }

  @Roles(ROLE.USER)
  @Put('/updateById/:id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
  ) {
    const user = await this.request.user;
    if (user.id === id || user.role === ROLE.MASTER) {
      await this.userService.update(id, userDto);
      return formatResponse(userDto, 0, '', []);
    }
    throw new ForbiddenException();
  }

  @Roles(ROLE.MASTER)
  @Delete('/deleteById/:id')
  @HttpCode(200)
  async delete(@Param('id') id: number) {
    await this.userService.remove(id);
    return formatResponse([], 0, 'delete success', []);
  }
}
