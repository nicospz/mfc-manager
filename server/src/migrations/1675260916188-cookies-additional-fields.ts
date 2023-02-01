import { MigrationInterface, QueryRunner } from "typeorm";

export class cookiesAdditionalFields1675260916188 implements MigrationInterface {
    name = 'cookiesAdditionalFields1675260916188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_cookie" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "value" varchar NOT NULL, "updatedAt" datetime NOT NULL, "domain" varchar NOT NULL, "path" varchar NOT NULL, "expiresAt" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_cookie"("id", "name", "value", "updatedAt") SELECT "id", "name", "value", "updatedAt" FROM "cookie"`);
        await queryRunner.query(`DROP TABLE "cookie"`);
        await queryRunner.query(`ALTER TABLE "temporary_cookie" RENAME TO "cookie"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cookie" RENAME TO "temporary_cookie"`);
        await queryRunner.query(`CREATE TABLE "cookie" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "value" varchar NOT NULL, "updatedAt" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "cookie"("id", "name", "value", "updatedAt") SELECT "id", "name", "value", "updatedAt" FROM "temporary_cookie"`);
        await queryRunner.query(`DROP TABLE "temporary_cookie"`);
    }

}
