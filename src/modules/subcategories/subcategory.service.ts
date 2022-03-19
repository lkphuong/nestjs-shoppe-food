import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubcategoryDto } from './dto/subcategory.dto';
import { SubcategoryEntity } from './entity/subcategory.entity';
@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(SubcategoryEntity)
    private subcategoryRepository: Repository<SubcategoryEntity>,
  ) {}

  async getAll() {
    return await this.subcategoryRepository.find({ take: 20 });
  }

  async getById(id: number) {
    const subcategory = await this.subcategoryRepository.findOne(id);
    if (subcategory) {
      return subcategory;
    }
    throw new NotFoundException();
  }

  async create(subcategoryDto: SubcategoryDto) {
    return await this.subcategoryRepository.save(subcategoryDto);
  }

  async update(id: number, subcategoryDto: Partial<SubcategoryDto>) {
    const subcategory = await this.subcategoryRepository.findOne(id);
    if (subcategory) {
      return await this.subcategoryRepository.update(id, subcategoryDto);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const subcategory = await this.subcategoryRepository.findOne(id);
    if (subcategory) {
      return await this.subcategoryRepository.delete(id);
    }
    throw new NotFoundException();
  }
}
