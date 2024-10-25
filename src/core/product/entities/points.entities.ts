import { UserEntity } from 'src/core/users/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('points')
export class PointsEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'PK-points',
  })
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'money_rate' })
  moneyRate: number;

  @Column({ name: 'min_staff' })
  minStaff: number;

  @Column({ name: 'max_staff' })
  maxStaff: number;

  @Column({ name: 'work_hours' })
  workHours: number;

  @Column({ name: 'address' })
  address: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations

  @ManyToOne(() => UserEntity, (user) => user.point, {
    nullable: false,
  })
  user: UserEntity;
}
