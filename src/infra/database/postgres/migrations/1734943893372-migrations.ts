import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1734943893372 implements MigrationInterface {
  name = 'Migrations1734943893372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK-user-recipient-transaction"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK-user-transaction"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "REL_31aa75ad82e16169a44212ea09"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "sender_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "REL_1ec6475edd98982e92f593d5d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "recipient_user_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "recipient_user_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "REL_1ec6475edd98982e92f593d5d8" UNIQUE ("recipient_user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "sender_user_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "REL_31aa75ad82e16169a44212ea09" UNIQUE ("sender_user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK-user-transaction" FOREIGN KEY ("sender_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK-user-recipient-transaction" FOREIGN KEY ("recipient_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
