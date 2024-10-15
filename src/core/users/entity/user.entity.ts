import { AutoMap } from '@automapper/classes';
import { UserEnums } from 'src/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'PK-users-id',
  })
  id: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'first_name', length: 63 })
  firstName: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'last_name', length: 63 })
  lastName: string;

  @AutoMap()
  @Column({ type: 'date' })
  birthday: Date;

  @AutoMap()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  password: string;

  @AutoMap()
  @Column({ type: 'enum', enum: UserEnums.RoleEnum })
  role: UserEnums.RoleEnum;

  @AutoMap()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @AutoMap()
  @Column({
    type: 'bool',
    name: 'is_blocked',
    default: false,
    nullable: false,
  })
  isBlocked?: boolean;

  @AutoMap()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
