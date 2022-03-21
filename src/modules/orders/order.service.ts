import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderEntity } from './entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async getAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({ take: 10 });
  }

  async getById(id: number): Promise<OrderEntity> {
    return await this.orderRepository.findOne(id, {
      relations: ['user', 'detailOrders', 'detailOrders.product'],
    });
  }

  async create(orderDto: any) {
    return await this.orderRepository.save(orderDto);
  }

  async update(id: number, orderDto: Partial<OrderDto>) {
    const order = await this.orderRepository.findOne(id);
    if (order) {
      return await this.orderRepository.update(id, orderDto);
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const order = await this.orderRepository.findOne(id);
    if (order) {
      return await this.orderRepository.delete(id);
    }
    throw new NotFoundException();
  }
}
