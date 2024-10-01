import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1727785607135 implements MigrationInterface {
  name = 'Migrations1727785607135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(63) NOT NULL, "points" integer NOT NULL, "financial_control" boolean NOT NULL, "artificial_intelligence" boolean NOT NULL, "employees_of_the_some_class" integer NOT NULL, "automation_of_payments" boolean NOT NULL, "active" boolean NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK-rate-id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO rate (title, points, financial_control, artificial_intelligence, employees_of_the_some_class, automation_of_payments, active, price) VALUES ('Start', 10, true, false, 15, false, true, 750), ('Basic', 30, true, true, 45, true, true, 1499), ('Pro', 100, true, true, 70, true, true, 5000)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rate"`);
  }
}
