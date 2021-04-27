import { MigrationInterface, QueryRunner } from "typeorm";

export class init1619392789637 implements MigrationInterface {
  name = "init1619392789637";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "providerId" character varying NOT NULL, "displayName" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ae9a93b13bce1425823c8ecd07" ON "user" ("provider", "providerId") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_ae9a93b13bce1425823c8ecd07"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
