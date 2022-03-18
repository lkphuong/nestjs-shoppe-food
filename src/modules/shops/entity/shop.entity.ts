import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { MenuEntity } from 'src/modules/menu/entity/menu.entity';
import { ProductEntity } from 'src/modules/products/entity/product.entity';
@Entity()
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;

  @OneToMany(() => MenuEntity, (menu) => menu.products)
  menus: MenuEntity[];
  @OneToMany(() => ProductEntity, (shop) => shop.shop)
  products: ProductEntity[];
}
