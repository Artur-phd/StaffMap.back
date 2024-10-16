import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'consultation' })
export class ConsultationEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK-consultation',
    name: 'consultation',
  })
  id: string;

  @AutoMap()
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @AutoMap()
  @Column({ name: 'phone', type: 'varchar' })
  phone: string;
}
