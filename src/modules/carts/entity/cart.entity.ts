import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { DetailCartEntity } from 'src/modules/detailCarts/entity/detailCart.entity';
@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  total: number;
  @Column()
  amount: number;
  @OneToMany(() => DetailCartEntity, (detailCart) => detailCart.cart)
  detailCarts: DetailCartEntity[];
}
