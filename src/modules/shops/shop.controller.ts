import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { formatResponse } from 'src/common/utils/response/response';
import { ShopDto } from './dto/shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}
  @Get()
  @HttpCode(200)
  async getAll() {
    const data = await this.shopService.getAll();
    return formatResponse(data, 0, '', []);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() shopDto: ShopDto) {
    const data = await this.shopService.create(shopDto);
    return formatResponse(data, 0, '', []);
  }
}
