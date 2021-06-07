import {MigrationInterface, QueryRunner} from "typeorm";

export class NowCommentsArePosts1623074717143 implements MigrationInterface {
    name = 'NowCommentsArePosts1623074717143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "chatId" character varying NOT NULL, "userId" integer NOT NULL, "text" character varying NOT NULL, "read" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chats" ("id" character varying NOT NULL, "senderId" integer NOT NULL, "recieverId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "parentPostId" character varying DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isOnline" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastSeen" TIMESTAMP NOT NULL DEFAULT '"2021-06-07T14:05:17.264Z"'`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_aae2a693e9663af83068dfd97d7" FOREIGN KEY ("parentPostId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_d697f19c9c7778ed773b449ce70" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats" ADD CONSTRAINT "FK_5d1a1ad54afb85368392e12eab0" FOREIGN KEY ("recieverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_5d1a1ad54afb85368392e12eab0"`);
        await queryRunner.query(`ALTER TABLE "chats" DROP CONSTRAINT "FK_d697f19c9c7778ed773b449ce70"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_aae2a693e9663af83068dfd97d7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastSeen"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isOnline"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "parentPostId"`);
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
