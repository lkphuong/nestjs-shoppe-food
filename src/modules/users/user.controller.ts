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
} from '@nestjs/common';
import { UserService } from './user.service';
import { formatResponse } from 'src/common/utils/response/response';
import { UserDto } from './dto/user.dto';
import { REQUEST } from '@nestjs/core';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(REQUEST) private request: any,
  ) {}

  @Roles(ROLE.MASTER)
  @Get()
  @HttpCode(200)
  async getAll() {
    const data = await this.userService.getAll();
    return formatResponse(data, 0, 'success', []);
  }

  @Get('/getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.getById(id);
    return formatResponse(data, 0, 'success', []);
  }

  @Get('/getByUsername/:username')
  @HttpCode(200)
  async getByUsername(@Param('username') username: string) {
    const data = await this.userService.getByUsername(username);
    return formatResponse(data, 0, 'success', []);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() userDto: UserDto) {
    const data = await this.userService.create(userDto);
    return formatResponse(data, 0, 'success', []);
  }

  @Put('/updateById/:id')
  @HttpCode(409)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
  ) {
    await this.userService.update(id, userDto);
    return formatResponse(userDto, 0, '', []);
  }

  @Delete('/deleteById/:id')
  @HttpCode(404)
  async delete(@Param('id') id: number) {
    await this.userService.remove(id);
    return formatResponse([], 0, 'delete success', []);
  }
}
