import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1675237238880 implements MigrationInterface {
    name = 'initial1675237238880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "figure" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "price" integer NOT NULL, "shop" varchar NOT NULL, "status" varchar CHECK( "status" IN ('Ordered','Owned','Wished') ) NOT NULL, "releaseDate" datetime, "paymentDate" datetime)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "figure"`);
    }

}
