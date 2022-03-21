import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailOrderEntity } from './entity/detailOrder.entity';
import { Repository, getConnection } from 'typeorm';

@Injectable()
export class DetailOrderSerive {
  constructor(
    @InjectRepository(DetailOrderEntity)
    private detailOrderRepository: Repository<DetailOrderEntity>,
  ) {}

  async create(detailOrderDto: any) {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(DetailOrderEntity)
      .values(detailOrderDto)
      .execute();
  }
}
