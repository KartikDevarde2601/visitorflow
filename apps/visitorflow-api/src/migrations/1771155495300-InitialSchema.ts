import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1771155495300 implements MigrationInterface {
    name = 'InitialSchema1771155495300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."visitors_type_enum" AS ENUM('GUEST', 'DELIVERY', 'CONTRACTOR')`);
        await queryRunner.query(`CREATE TABLE "visitors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying NOT NULL, "name" character varying NOT NULL, "company" character varying, "type" "public"."visitors_type_enum" NOT NULL DEFAULT 'GUEST', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e69383e518323beabb85050f7fc" UNIQUE ("phone"), CONSTRAINT "PK_d0fd6e34a516c2bb3bbec71abde" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'GUARD', 'HOST')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'HOST', "passwordHash" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."visits_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'ENTERED', 'EXITED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "visits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."visits_status_enum" NOT NULL DEFAULT 'PENDING', "purpose" character varying NOT NULL, "entryTime" TIMESTAMP, "exitTime" TIMESTAMP, "expectedTime" TIMESTAMP NOT NULL, "qrCodeHash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "visitor_id" uuid, "host_id" uuid, "guard_id" uuid, CONSTRAINT "PK_0b0b322289a41015c6ea4e8bf30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."attachments_type_enum" AS ENUM('SELFIE', 'VEHICLE', 'PARCEL')`);
        await queryRunner.query(`CREATE TABLE "attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."attachments_type_enum" NOT NULL, "url" character varying NOT NULL, "bucket" character varying NOT NULL, "key" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "visit_id" uuid, CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "visits" ADD CONSTRAINT "FK_21c7fdcd0584490aa60ca67fd2d" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visits" ADD CONSTRAINT "FK_8f59fcb37b22dc25e9743c096f3" FOREIGN KEY ("host_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visits" ADD CONSTRAINT "FK_91fd9f365a5c11675d63c20b869" FOREIGN KEY ("guard_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachments" ADD CONSTRAINT "FK_f2ece73b5779f73248c00b0fa88" FOREIGN KEY ("visit_id") REFERENCES "visits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_f2ece73b5779f73248c00b0fa88"`);
        await queryRunner.query(`ALTER TABLE "visits" DROP CONSTRAINT "FK_91fd9f365a5c11675d63c20b869"`);
        await queryRunner.query(`ALTER TABLE "visits" DROP CONSTRAINT "FK_8f59fcb37b22dc25e9743c096f3"`);
        await queryRunner.query(`ALTER TABLE "visits" DROP CONSTRAINT "FK_21c7fdcd0584490aa60ca67fd2d"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
        await queryRunner.query(`DROP TYPE "public"."attachments_type_enum"`);
        await queryRunner.query(`DROP TABLE "visits"`);
        await queryRunner.query(`DROP TYPE "public"."visits_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "visitors"`);
        await queryRunner.query(`DROP TYPE "public"."visitors_type_enum"`);
    }

}
