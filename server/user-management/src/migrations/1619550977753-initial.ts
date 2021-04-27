import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1619550977753 implements MigrationInterface {
  name = "initial1619550977753";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "providerId" character varying NOT NULL, "displayName" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_383db4af0712cd891c97a5be86" ON "user_profile" ("provider", "providerId") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_383db4af0712cd891c97a5be86"`);
    await queryRunner.query(`DROP TABLE "user_profile"`);
  }
}
