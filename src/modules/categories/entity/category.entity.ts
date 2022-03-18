import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { SubcategoryEntity } from 'src/modules/subcategories/entity/subcategory.entity';
import { ProductEntity } from 'src/modules/products/entity/product.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => SubcategoryEntity, (subcategory) => subcategory.category)
  subcategory: SubcategoryEntity[];
  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
