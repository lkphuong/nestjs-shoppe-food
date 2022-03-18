import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  role: string;
  @Column()
  description: string;
  @OneToMany(() => UserEntity, (user) => user.group)
  users: UserEntity[];
}
