import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729084545883 implements MigrationInterface {
  name = 'Migrations1729084545883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "consultation" ("consultation" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK-consultation" PRIMARY KEY ("consultation"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "consultation"`);
  }
}
