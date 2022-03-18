import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { DetailOrderEntity } from 'src/modules/detailOrders/entity/detailOrder.entity';
import { UserEntity } from 'src/modules/users/entity/user.entity';
@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  total: number;
  @Column()
  amount: number;
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
  @OneToMany(() => DetailOrderEntity, (detailOrder) => detailOrder.order)
  detailOrders: DetailOrderEntity[];
}
