import { UserEntity } from 'src/core/users/entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'staff' })
export class StaffEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'PK-staff',
  })
  id: string;

  @Column({ name: 'worker_role', type: 'varchar', length: 35 })
  workerRole: string;

  @Column({ name: 'hour_rate', type: 'float' })
  hourRate: number;

  @Column({ name: 'payday', type: 'date' })
  payday: Date;

  @Column({ name: 'money_now', type: 'float' })
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
}
