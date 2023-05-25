import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class cookies1675256636341 implements MigrationInterface {
    name = 'cookies1675256636341';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "cookie" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "value" varchar NOT NULL, "updatedAt" datetime NOT NULL)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cookie"`);
    }
}
