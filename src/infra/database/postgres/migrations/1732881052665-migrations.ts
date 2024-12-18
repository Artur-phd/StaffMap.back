import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732881052665 implements MigrationInterface {
  name = 'Migrations1732881052665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "staff" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "UQ_cec9365d9fc3a3409158b645f2e" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK-user-staff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK-user-staff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "UQ_cec9365d9fc3a3409158b645f2e"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "user_id"`);
  }
}
