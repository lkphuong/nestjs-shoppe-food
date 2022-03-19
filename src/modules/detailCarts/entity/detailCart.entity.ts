import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { CartEntity } from 'src/modules/carts/entity/cart.entity';
import { ProductEntity } from 'src/modules/products/entity/product.entity';
@Entity()
export class DetailCartEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => CartEntity, (cart) => cart.detailCarts)
  cart: CartEntity;
  @ManyToOne(() => ProductEntity, (product) => product.detailCart)
  product: ProductEntity;
}
