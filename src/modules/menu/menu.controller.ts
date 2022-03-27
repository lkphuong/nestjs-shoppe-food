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
import { Public } from 'src/auth/setMetadata';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';
import { formatResponse } from 'src/common/utils/response/response';
import { MenuDto } from './dto/menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Public()
  @Get()
  @HttpCode(200)
  async getAll() {
    const data = await this.menuService.getAll();
    return formatResponse(data, 0, '', []);
  }

  @Public()
  @Get('getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.menuService.getById(id);
    return formatResponse(data, 0, '', []);
  }

  @Roles(ROLE.ADMIN)
  @Post()
  @HttpCode(201)
  async create(@Body() menuDto: MenuDto) {
    const data = await this.menuService.create(menuDto);
    return formatResponse(data, 0, '', []);
  }

  @Roles(ROLE.ADMIN)
  @Put('updateById/:id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() menuDto: MenuDto,
  ) {
    await this.menuService.update(id, menuDto);
    const menu = await this.menuService.getById(id);
    return formatResponse(menu, 0, 'update success', []);
  }

  @Roles(ROLE.ADMIN)
  @Delete('deleteById/:id')
  @HttpCode(200)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.menuService.remove(id);
    return formatResponse({}, 0, 'delete success', []);
  }
}
