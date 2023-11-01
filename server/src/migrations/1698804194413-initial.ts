import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1698804194413 implements MigrationInterface {
    name = 'initial1698804194413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cookie" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "value" varchar NOT NULL, "domain" varchar NOT NULL, "path" varchar NOT NULL, "expiresAt" datetime NOT NULL, "updatedAt" datetime NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "figure" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "price" integer NOT NULL, "shop" varchar NOT NULL, "status" varchar NOT NULL, "imageUrl" text, "releaseDate" datetime, "paymentDate" datetime, "score" integer NOT NULL, "wishability" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "figure"`);
        await queryRunner.query(`DROP TABLE "cookie"`);
    }

}
