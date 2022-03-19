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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { formatResponse } from 'src/common/utils/response/response';
import { storage } from 'src/config/storage/storage';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    const data = await this.productService.getAll();
    return formatResponse(data, 0, '', []);
  }

  @Get('/getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.getById(id);
    return formatResponse(data, 0, '', []);
  }

  @Get('getBySlug/:slug')
  @HttpCode(200)
  async getBySlug(@Param('slug') slug: string) {
    const data = await this.productService.getBySlug(slug);
    return formatResponse(data, 0, '', []);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  @HttpCode(201)
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() productDto: ProductDto,
  ) {
    productDto.image = image.path;
    const data = await this.productService.create(productDto);
    return formatResponse(data, 0, '', []);
  }

  @Put('/updateById/:id')
  @HttpCode(409)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: ProductDto,
  ) {
    await this.productService.update(id, productDto);
    const data = await this.productService.getById(id);
    return formatResponse(data, 0, '', []);
  }

  @Delete('/deleteById/:id')
  @HttpCode(404)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productService.remove(id);
    return formatResponse({}, 0, '', []);
  }
}
