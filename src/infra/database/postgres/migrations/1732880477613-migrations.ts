import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732880477613 implements MigrationInterface {
  name = 'Migrations1732880477613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "worker_role" character varying(35) NOT NULL, "hour_rate" double precision NOT NULL, "payday" date NOT NULL, "money_now" double precision NOT NULL, CONSTRAINT "PK-staff" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "staff"`);
  }
}
