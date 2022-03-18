import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      take: 20,
      relations: ['menu', 'shop', 'category', "'subcategory"],
    });
    return products;
  }

  async getById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id);
    if (product) {
      return product;
    }
    throw new NotFoundException();
  }

  async getBySlug(slug: string): Promise<ProductEntity[]> {
    const product = await this.productRepository.find({ slug: slug });
    if (product) {
      return product;
    }
    throw new NotFoundException();
  }

  async create(productDto: ProductDto) {
    productDto.slug = productDto.slug.replace(' ', '-');
    return await this.productRepository.save(productDto);
  }

  async update(id: number, productDto: Partial<ProductDto>) {
    const product = await this.productRepository.findOne(id);
    if (product) {
      return await this.productRepository.update(id, productDto);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne(id);
    if (product) {
      return await this.productRepository.delete(id);
    }
    throw new NotFoundException();
  }
}
