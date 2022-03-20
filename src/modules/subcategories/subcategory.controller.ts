import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  ParseIntPipe,
  Param,
  Body,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CategoryDto } from '../categories/dto/category.dto';
import { formatResponse } from 'src/common/utils/response/response';
import { Public } from 'src/auth/setMetadata';
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';
@Controller('subcategory')
export class SubcategoryController {
  constructor(private subcategoryService: SubcategoryService) {}

  @Public()
  @Get()
  @HttpCode(200)
  async getAll() {
    const categories = await this.subcategoryService.getAll();
    return formatResponse(categories, 0, '', []);
  }

  @Public()
  @Get('/getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const category = await this.subcategoryService.getById(id);
    return formatResponse(category, 0, '', []);
  }

  @Roles(ROLE.MASTER)
  @Post()
  @HttpCode(201)
  async create(@Body() categoryDto: CategoryDto) {
    const category = await this.subcategoryService.create(categoryDto);
    return formatResponse(category, 0, '', []);
  }

  @Roles(ROLE.MASTER)
  @Put('/updateById/:id')
  @HttpCode(409)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryDto: CategoryDto,
  ) {
    await this.subcategoryService.update(id, categoryDto);
    const category = await this.subcategoryService.getById(id);
    return formatResponse(category, 0, '', []);
  }

  @Roles(ROLE.MASTER)
  @Delete('deleteById/:id')
  @HttpCode(404)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.subcategoryService.remove(id);
    return formatResponse({}, 0, '', []);
  }
}
