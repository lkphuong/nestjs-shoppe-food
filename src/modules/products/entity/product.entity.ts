import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ShopEntity } from 'src/modules/shops/entity/shop.entity';
import { CategoryEntity } from 'src/modules/categories/entity/category.entity';
import { SubcategoryEntity } from 'src/modules/subcategories/entity/subcategory.entity';
import { MenuEntity } from 'src/modules/menu/entity/menu.entity';
import { DetailOrderEntity } from 'src/modules/detailOrders/entity/detailOrder.entity';
import { DetailCartEntity } from 'src/modules/detailCarts/entity/detailCart.entity';
@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  slug: string;
  @Column()
  image: string;
  @Column()
  price: number;
  @ManyToOne(() => MenuEntity, (menu) => menu.products)
  menu: MenuEntity;
  @ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.products)
  subcategory: SubcategoryEntity;
  @ManyToOne(() => ShopEntity, (shop) => shop.products)
  shop: ShopEntity;
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;
  @OneToMany(() => DetailOrderEntity, (detailOrder) => detailOrder.product)
  detailOrder: DetailOrderEntity[];
  @OneToMany(() => DetailCartEntity, (detailCart) => detailCart.product)
  detailCart: DetailCartEntity[];
}
