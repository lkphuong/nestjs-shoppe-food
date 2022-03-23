import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';
import { formatResponse } from 'src/common/utils/response/response';
import { DetailCartService } from './detailCart.service';
import { DetailCartDto } from './dto/detailCart.dto';
@Controller('detailCart')
export class DetailCartController {
  constructor(private detailCartService: DetailCartService) {}

  @Roles(ROLE.MASTER)
  @Post()
  @HttpCode(201)
  async create(@Body() detailCartDto: DetailCartDto) {
    return await this.detailCartService.create(detailCartDto);
  }

  @Roles(ROLE.MASTER)
  @Delete('deleteByDetailCart')
  @HttpCode(404)
  async detele(@Body() detailCartDto: DetailCartDto) {
    await this.detailCartService.remove(detailCartDto);
    return formatResponse({}, 0, 'Delete item success', []);
  }
}
