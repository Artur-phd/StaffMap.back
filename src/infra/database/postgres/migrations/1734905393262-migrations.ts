import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734905393262 implements MigrationInterface {
  name = 'Migrations1734905393262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_type_enum" AS ENUM('fine', 'depositing', 'prize')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transactions_type_enum" NOT NULL, "size" double precision NOT NULL, "description" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sender_user_id" uuid, "recipient_user_id" uuid, CONSTRAINT "REL_31aa75ad82e16169a44212ea09" UNIQUE ("sender_user_id"), CONSTRAINT "REL_1ec6475edd98982e92f593d5d8" UNIQUE ("recipient_user_id"), CONSTRAINT "PK-transactions" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK-user-transaction" FOREIGN KEY ("sender_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK-user-recipient-transaction" FOREIGN KEY ("recipient_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK-user-recipient-transaction"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK-user-transaction"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "created_at"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
  }
}
