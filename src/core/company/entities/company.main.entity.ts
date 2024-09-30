import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'company' })
export class CompanyEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK-company-id',
    name: 'id',
  })
  id: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    length: 63,
  })
  title: string;
}
