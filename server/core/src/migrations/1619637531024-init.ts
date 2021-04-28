import {MigrationInterface, QueryRunner} from "typeorm";

export class init1619637531024 implements MigrationInterface {
    name = 'init1619637531024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "projectId" uuid NOT NULL, "lang" character varying NOT NULL, "namespace" character varying NOT NULL, "key" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_aca248c72ae1fb2390f1bf4cd87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2aad4d0a15f43d2156833471dd" ON "translations" ("projectId", "key", "lang", "namespace") `);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "githubOwner" character varying NOT NULL, "githubRepo" character varying NOT NULL, "lngLoadPath" character varying NOT NULL, "languages" text array, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "translations" ADD CONSTRAINT "FK_951b4279c5862f80fb383d42861" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "translations" DROP CONSTRAINT "FK_951b4279c5862f80fb383d42861"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP INDEX "IDX_2aad4d0a15f43d2156833471dd"`);
        await queryRunner.query(`DROP TABLE "translations"`);
    }

}
