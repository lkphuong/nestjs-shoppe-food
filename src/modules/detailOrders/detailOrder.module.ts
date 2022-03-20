import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrderSerive } from './detailOrder.service';
import { DetailOrderEntity } from './entity/detailOrder.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DetailOrderEntity])],
  providers: [DetailOrderSerive],
  exports: [DetailOrderSerive],
})
export class DetailOrderModule {}
