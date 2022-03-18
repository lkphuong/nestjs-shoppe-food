import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { CartEnity } from 'src/modules/carts/entity/cart.entity';
import { ProductEntity } from 'src/modules/products/entity/product.entity';
@Entity()
export class DetailCartEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => CartEnity, (cart) => cart.detailCarts)
  cart: CartEnity;
  @ManyToOne(() => ProductEntity, (product) => product.detailCart)
  product: ProductEntity;
}
