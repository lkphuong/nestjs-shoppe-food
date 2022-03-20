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
import { ShopDto } from './dto/shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Public()
  @Get()
  @HttpCode(200)
  async getAll() {
    const data = await this.shopService.getAll();
    return formatResponse(data, 0, '', []);
  }

  @Public()
  @Get('/getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.shopService.getbyId(id);
    return formatResponse(data, 0, '', []);
  }

  @Roles(ROLE.ADMIN)
  @Post()
  @HttpCode(201)
  async create(@Body() shopDto: ShopDto) {
    const data = await this.shopService.create(shopDto);
    return formatResponse(data, 0, '', []);
  }

  @Roles(ROLE.ADMIN)
  @Put('/updateById/:id')
  @HttpCode(409)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() shopDto: ShopDto,
  ) {
    await this.shopService.update(id, shopDto);
    const shop = await this.shopService.getbyId(id);
    return formatResponse(shop, 0, '', []);
  }

  @Roles(ROLE.ADMIN)
  @Delete('/deleteById/:id')
  @HttpCode(404)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.shopService.remove(id);
    return formatResponse({}, 0, '', []);
  }
}
