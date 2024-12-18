import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733691331266 implements MigrationInterface {
  name = 'Migrations1733691331266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "worker_role" SET DEFAULT 'employ'`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "hour_rate" SET DEFAULT '12'`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "payday"`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "payday" integer NOT NULL DEFAULT '15'`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "money_now" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "money_now" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "payday"`);
    await queryRunner.query(`ALTER TABLE "staff" ADD "payday" date NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "hour_rate" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "worker_role" DROP DEFAULT`,
    );
  }
}
