import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CategoryEntity } from 'src/modules/categories/entity/category.entity';
import { ProductEntity } from 'src/modules/products/entity/product.entity';
@Entity()
export class SubcategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToOne(() => CategoryEntity, (category) => category.subcategory)
  category: CategoryEntity;
  @OneToMany(() => ProductEntity, (product) => product.subcategory)
  products: ProductEntity[];
}
