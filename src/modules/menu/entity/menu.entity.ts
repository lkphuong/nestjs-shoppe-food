import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ShopEntity } from 'src/modules/shops/entity/shop.entity';
import { ProductEntity } from 'src/modules/products/entity/product.entity';
@Entity()
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => ShopEntity, (shop) => shop.menus)
  shop: ShopEntity;
  @OneToMany(() => ProductEntity, (product) => product.menu)
  products: ProductEntity[];
}
