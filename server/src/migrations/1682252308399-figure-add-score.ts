import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class figureAddScore1682252308399 implements MigrationInterface {
    name = 'figureAddScore1682252308399';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "temporary_figure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "price" integer NOT NULL, "shop" varchar NOT NULL, "status" varchar CHECK( "status" IN ('Ordered','Owned','Wished') ) NOT NULL, "releaseDate" datetime, "paymentDate" datetime, "imageUrl" varchar, "score" integer)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_figure"("id", "title", "price", "shop", "status", "releaseDate", "paymentDate", "imageUrl") SELECT "id", "title", "price", "shop", "status", "releaseDate", "paymentDate", "imageUrl" FROM "figure"`
        );
        await queryRunner.query(`DROP TABLE "figure"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_figure" RENAME TO "figure"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "figure" RENAME TO "temporary_figure"`
        );
        await queryRunner.query(
            `CREATE TABLE "figure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "price" integer NOT NULL, "shop" varchar NOT NULL, "status" varchar CHECK( "status" IN ('Ordered','Owned','Wished') ) NOT NULL, "releaseDate" datetime, "paymentDate" datetime, "imageUrl" varchar)`
        );
        await queryRunner.query(
            `INSERT INTO "figure"("id", "title", "price", "shop", "status", "releaseDate", "paymentDate", "imageUrl") SELECT "id", "title", "price", "shop", "status", "releaseDate", "paymentDate", "imageUrl" FROM "temporary_figure"`
        );
        await queryRunner.query(`DROP TABLE "temporary_figure"`);
    }
}
