import { CartEntity } from 'src/modules/carts/entity/cart.entity';
import { OrderEntity } from 'src/modules/orders/entity/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { GroupEntity } from '../../groups/entity/group.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ default: null })
  refreshToken?: string;
  @ManyToOne(() => GroupEntity, (group) => group.users)
  group: GroupEntity;
  @OneToOne(() => CartEntity)
  @JoinColumn()
  cart: CartEntity;
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
