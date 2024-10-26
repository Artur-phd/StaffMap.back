import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729883087049 implements MigrationInterface {
  name = 'Migrations1729883087049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(63) NOT NULL, "points" integer NOT NULL, "financial_control" boolean NOT NULL, "artificial_intelligence" boolean NOT NULL, "employees_of_the_some_class" integer NOT NULL, "automation_of_payments" boolean NOT NULL, "active" boolean NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK-rate-id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "consultation" ("consultation" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK-consultation" PRIMARY KEY ("consultation"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "points" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "money_rate" integer NOT NULL, "min_staff" integer NOT NULL, "max_staff" integer NOT NULL, "work_hours" integer NOT NULL, "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK-points" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('super-admin', 'admin', 'employ', 'manager')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(63) NOT NULL, "last_name" character varying(63) NOT NULL, "birthday" date NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_blocked" boolean NOT NULL DEFAULT false, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK-users-id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "points" ADD CONSTRAINT "FK_b777120b2815c7a2c3e2cb1e350" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "points" DROP CONSTRAINT "FK_b777120b2815c7a2c3e2cb1e350"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "points"`);
    await queryRunner.query(`DROP TABLE "consultation"`);
    await queryRunner.query(`DROP TABLE "rate"`);
  }
}
