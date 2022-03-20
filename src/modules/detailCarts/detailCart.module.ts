import { Module } from '@nestjs/common';
import { DetailCartController } from './detailCart.controller';
import { DetailCartService } from './detailCart.service';
import { DetailCartEntity } from './entity/detailCart.entity';
import { ProductModule } from '../products/product.module';
import { CartModule } from '../carts/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetailCartEntity]),
    CartModule,
    ProductModule,
  ],
  controllers: [DetailCartController],
  providers: [DetailCartService],
  exports: [DetailCartService],
})
export class DetailCartModule {}
