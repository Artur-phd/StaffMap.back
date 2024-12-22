import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734876847152 implements MigrationInterface {
  name = 'Migrations1734876847152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "balance" double precision NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "balance"`);
  }
}
