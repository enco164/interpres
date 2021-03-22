import { MigrationInterface, QueryRunner } from "typeorm";

export class init1616370023771 implements MigrationInterface {
  name = "init1616370023771";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "translation"
                             (
                                 "id"        SERIAL            NOT NULL,
                                 "projectId" integer           NOT NULL,
                                 "lang"      character varying NOT NULL,
                                 "namespace" character varying NOT NULL,
                                 "key"       character varying NOT NULL,
                                 "value"     character varying NOT NULL,
                                 CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9c4a43f092da170f834707dbcd" ON "translation" ("projectId", "key", "lang", "namespace") `
    );
    await queryRunner.query(`CREATE TABLE "project"
                             (
                                 "id"   SERIAL            NOT NULL,
                                 "name" character varying NOT NULL,
                                 CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "translation"
        ADD CONSTRAINT "FK_ab3ce305a27bbcddf9e5880a237" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "translation"
        DROP CONSTRAINT "FK_ab3ce305a27bbcddf9e5880a237"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP INDEX "IDX_9c4a43f092da170f834707dbcd"`);
    await queryRunner.query(`DROP TABLE "translation"`);
  }
}
