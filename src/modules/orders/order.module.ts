import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CartModule } from '../carts/cart.module';
import { DetailCartModule } from '../detailCarts/detailCart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { DetailOrderModule } from '../detailOrders/detailOrder.module';

@Module({
  imports: [
    CartModule,
    DetailCartModule,
    DetailOrderModule,
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
