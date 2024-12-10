import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733818918454 implements MigrationInterface {
  name = 'Migrations1733818918454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "staff" ADD "point_now_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK-point-staff" FOREIGN KEY ("point_now_id") REFERENCES "points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK-point-staff"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "point_now_id"`);
  }
}
