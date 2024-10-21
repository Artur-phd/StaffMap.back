import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729508095397 implements MigrationInterface {
  name = 'Migrations1729508095397';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "points" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "money_rate" integer NOT NULL, "min_staff" integer NOT NULL, "max_staff" integer NOT NULL, "work_hours" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK-points" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "points"`);
  }
}
