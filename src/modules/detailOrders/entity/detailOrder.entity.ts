import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { ProductEntity } from 'src/modules/products/entity/product.entity';
import { OrderEntity } from 'src/modules/orders/entity/order.entity';
@Entity()
export class DetailOrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => ProductEntity, (product) => product.detailOrder)
  product: ProductEntity;
  @ManyToOne(() => OrderEntity, (order) => order.detailOrders)
  order: OrderEntity;
}
