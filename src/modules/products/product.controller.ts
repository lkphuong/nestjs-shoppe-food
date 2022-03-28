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
import { Roles } from 'src/common/decorators/role.decorator';
import { ROLE } from 'src/common/emuns/role.emun';
import { Public } from 'src/auth/setMetadata';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get()
  @HttpCode(200)
  async getAll() {
    const data = await this.productService.getAll();
    return formatResponse(data, 0, '', []);
  }

  @Public()
  @Get('/getById/:id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.getById(id);
    return formatResponse(data, 0, '', []);
  }

  @Public()
  @Get('getBySlug/:slug')
  @HttpCode(200)
  async getBySlug(@Param('slug') slug: string) {
    const data = await this.productService.getBySlug(slug);
    return formatResponse(data, 0, '', []);
  }

  @Roles(ROLE.ADMIN)
  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  @HttpCode(201)
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() productDto: ProductDto,
  ) {
    console.log(image);
    productDto.image = image.path.slice(7);
    console.log(productDto);
    const data = await this.productService.create(productDto);
    return formatResponse(data, 0, '', []);
  }

  @Roles(ROLE.ADMIN)
  @Put('/updateById/:id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: ProductDto,
  ) {
    await this.productService.update(id, productDto);
    const data = await this.productService.getById(id);
    return formatResponse(data, 0, '', []);
  }

  @Roles(ROLE.ADMIN)
  @Delete('/deleteById/:id')
  @HttpCode(200)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productService.remove(id);
    return formatResponse({}, 0, '', []);
  }
}
