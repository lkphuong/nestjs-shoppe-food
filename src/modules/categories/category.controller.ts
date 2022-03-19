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
} from '@nestjs/common';
import { formatResponse } from 'src/common/utils/response/response';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  @HttpCode(200)
  async getAll() {
    const categories = await this.categoryService.getAll();
    return formatResponse(categories, 0, '', []);
  }

  @Get('/getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.getById(id);
    return formatResponse(category, 0, '', []);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() categoryDto: CategoryDto) {
    const category = await this.categoryService.create(categoryDto);
    return formatResponse(category, 0, '', []);
  }

  @Put('/updateById/:id')
  @HttpCode(409)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryDto: CategoryDto,
  ) {
    await this.categoryService.update(id, categoryDto);
    const category = await this.categoryService.getById(id);
    return formatResponse(category, 0, '', []);
  }

  @Delete('deleteById/:id')
  @HttpCode(404)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.remove(id);
    return formatResponse({}, 0, '', []);
  }
}
