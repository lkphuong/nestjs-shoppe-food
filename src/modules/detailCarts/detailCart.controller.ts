import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { Roles } from 'src/common/decorators/role.decorator';
import { formatResponse } from 'src/common/utils/response/response';
import { DetailCartService } from './detailCart.service';
import { DetailCartDto } from './dto/detailCart.dto';
@Controller('detailCart')
export class DetailCartController {
  constructor(private detailCartService: DetailCartService) {}

  @Roles()
  @Post()
  @HttpCode(201)
  async create(@Body() detailCartDto: DetailCartDto) {
    return await this.detailCartService.create(detailCartDto);
  }

  @Roles()
  @Delete('deleteByDetailCart')
  @HttpCode(404)
  async detele(@Body() detailCartDto: DetailCartDto) {
    await this.detailCartService.remove(detailCartDto);
    return formatResponse({}, 0, 'Delete item success', []);
  }
}
