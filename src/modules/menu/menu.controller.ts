import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { formatResponse } from 'src/common/utils/response/response';
import { MenuDto } from './dto/menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    const data = await this.menuService.getAll();
    return formatResponse(data, 0, '', []);
  }

  @Get('/getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.menuService.getById(id);
    return formatResponse(data, 0, '', []);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() menuDto: MenuDto) {
    const data = await this.menuService.create(menuDto);
    return formatResponse(data, 0, '', []);
  }

  @Put('/updateById/:id')
  @HttpCode(409)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() menuDto: MenuDto,
  ) {
    await this.menuService.update(id, menuDto);
    const menu = await this.menuService.getById(id);
    return formatResponse(menu, 0, 'update success', []);
  }

  @Delete('/deleteById/:id')
  @HttpCode(404)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.menuService.remove(id);
    return formatResponse({}, 0, 'delete success', []);
  }
}
