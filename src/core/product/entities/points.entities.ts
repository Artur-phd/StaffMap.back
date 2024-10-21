import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('points')
export class PointsEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'PK-points',
  })
  id: string;

  @Column({ name: 'money_rate' })
  moneyRate: number;

  @Column({ name: 'min_staff' })
  minStaff: number;

  @Column({ name: 'max_staff' })
  maxStaff: number;

  @Column({ name: 'work_hours' })
  workHours: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
