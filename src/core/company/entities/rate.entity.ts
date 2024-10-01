import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'rate' })
export class RateEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK-rate-id',
    name: 'id',
  })
  id: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    length: 63,
  })
  title: string;

  @AutoMap()
  @Column({
    type: 'integer',
  })
  points: number;

  @AutoMap()
  @Column({
    name: 'financial_control',
  })
  financialControl: boolean;

  @AutoMap()
  @Column({
    name: 'artificial_intelligence',
  })
  artificialIntelligence: boolean;

  @AutoMap()
  @Column({
    name: 'employees_of_the_some_class',
  })
  employeesOfTheSomeClass: number;

  @AutoMap()
  @Column({
    name: 'automation_of_payments',
  })
  automationOfPayments: boolean;

  @AutoMap()
  @Column({
    name: 'active',
  })
  active: boolean;

  @AutoMap()
  @Column({
    name: 'price',
  })
  price: number;

  @AutoMap()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
