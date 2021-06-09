import {MigrationInterface, QueryRunner} from "typeorm";

export class ChatCascadeDeleteMessages1623263363696 implements MigrationInterface {
    name = 'ChatCascadeDeleteMessages1623263363696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_aae2a693e9663af83068dfd97d7"`);
        await queryRunner.query(`COMMENT ON COLUMN "posts"."parentPostId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "parentPostId" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastSeen" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '"2021-06-09T18:29:24.043Z"'`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_aae2a693e9663af83068dfd97d7" FOREIGN KEY ("parentPostId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_aae2a693e9663af83068dfd97d7"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastSeen" SET DEFAULT '2021-06-07 14:05:17.264'`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastSeen" IS NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "parentPostId" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "posts"."parentPostId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_aae2a693e9663af83068dfd97d7" FOREIGN KEY ("parentPostId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
