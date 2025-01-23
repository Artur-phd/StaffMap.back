import { AutoMap } from '@automapper/classes';
import { UserEntity } from 'src/core/users/entity';
import { AppEnums } from 'src/shared/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionsEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'PK-transactions',
  })
  id: string;

  @AutoMap()
  @Column({
    name: 'type',
    type: 'enum',
    enum: AppEnums.TransactionTypes,
  })
  type: AppEnums.TransactionTypes;

  @AutoMap()
  @Column({
    name: 'size',
    type: 'float',
  })
  size: number;

  @AutoMap()
  @Column({
    name: 'description',
    type: 'varchar',
    length: 50,
  })
  description: string;

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

  // Relations

  @ManyToMany(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinColumn({
    name: 'sender_user_id',
    foreignKeyConstraintName: 'FK-user-transaction',
  })
  senderUserId: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinColumn({
    name: 'recipient_user_id',
    foreignKeyConstraintName: 'FK-user-recipient-transaction',
  })
  recipientUserId: UserEntity;
}
