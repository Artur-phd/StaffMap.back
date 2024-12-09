import { AutoMap } from '@automapper/classes';
import { UserEntity } from 'src/core/users/entity';
import { RoleEnum } from 'src/shared/enums/user/roles';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'staff' })
export class StaffEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'PK-staff',
  })
  id: string;
  @AutoMap()
  @Column({
    name: 'worker_role',
    type: 'varchar',
    length: 35,
    default: RoleEnum.EMPLOY,
  })
  workerRole: string;

  @AutoMap()
  @Column({ name: 'hour_rate', type: 'float', default: 12 })
  hourRate: number;

  @AutoMap()
  @Column({ name: 'payday', type: 'integer', default: 15 })
  payday: number;

  @AutoMap()
  @Column({ name: 'money_now', type: 'float', default: 0 })
  moneyNow: number;

  // Relations
  @OneToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK-user-staff',
  })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'maneger_user_id',
    foreignKeyConstraintName: 'FK-user-manager-staff',
  })
  manager: UserEntity;
}
