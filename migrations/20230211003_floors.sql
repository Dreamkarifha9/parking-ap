DROP TABLE IF EXISTS "parking"."floors";
CREATE SEQUENCE "parking".floor_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;
CREATE TABLE IF NOT EXISTS "parking"."floors" (
    id BIGINT DEFAULT nextval('"parking".floor_id_seq'::regclass),
    "blockId" INT,
    "floorNumber" INT,
    "numberOfSlot" INT,
    "active" BOOLEAN DEFAULT true,
    "deleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "createdBy" CHARACTER VARYING,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updatedBy" CHARACTER VARYING,

    CONSTRAINT "pk_floors" PRIMARY KEY ("id"),
    CONSTRAINT "fk_floor_blocks" FOREIGN KEY ("blockId") REFERENCES "parking"."blocks"(id)
);
