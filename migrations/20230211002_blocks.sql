CREATE TYPE "public"."eCarSize" AS ENUM (
	'SMAILL',
	'MEDIUM',
	'LARGE'
);

DROP TABLE IF EXISTS "parking"."blocks";
CREATE SEQUENCE "parking".block_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;
CREATE TABLE IF NOT EXISTS "parking"."blocks" (
    id BIGINT DEFAULT nextval('"parking".block_id_seq'::regclass),
    "parkingLotId" INT,
    "blockCode" CHARACTER VARYING NULL,
    "blockSize" public."eCarSize" NOT null,
    "active" BOOLEAN DEFAULT true,
    "deleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "createdBy" CHARACTER VARYING,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updatedBy" CHARACTER VARYING,

    CONSTRAINT "pk_blocks" PRIMARY KEY ("id"),
    CONSTRAINT "fk_blocks_parking_lot" FOREIGN KEY ("parkingLotId") REFERENCES "parking"."parking_lot"(id)
);
