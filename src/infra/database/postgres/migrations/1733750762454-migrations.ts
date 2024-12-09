import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733750762454 implements MigrationInterface {
  name = 'Migrations1733750762454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "maneger_user_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK-user-manager-staff" FOREIGN KEY ("maneger_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK-user-manager-staff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP COLUMN "maneger_user_id"`,
    );
  }
}
