import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({
      take: 20,
      relations: ['products', 'subcategory'],
    });
  }

  async getById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['products', 'subcategory'],
    });
    if (category) {
      return category;
    }
    throw new NotFoundException();
  }

  async create(categoryDto: CategoryDto) {
    return await this.categoryRepository.save(categoryDto);
  }

  async update(id: number, categoryDto: Partial<CategoryDto>) {
    const category = await this.categoryRepository.findOne(id);
    if (category) {
      return await this.categoryRepository.update(id, categoryDto);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne(id);
    if (category) {
      return await this.categoryRepository.delete(id);
    }
    throw new NotFoundException();
  }
}
