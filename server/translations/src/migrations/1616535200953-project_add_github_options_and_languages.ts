import { MigrationInterface, QueryRunner } from "typeorm";

export class projectAddGithubOptionsAndLanguages1616535200953
  implements MigrationInterface {
  name = "projectAddGithubOptionsAndLanguages1616535200953";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" ADD "githubOwner" character varying NOT NULL default ''`
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "githubRepo" character varying NOT NULL default ''`
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "lngLoadPath" character varying NOT NULL default ''`
    );
    await queryRunner.query(`ALTER TABLE "project" ADD "languages" text array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "languages"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "lngLoadPath"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "githubRepo"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "githubOwner"`);
  }
}
