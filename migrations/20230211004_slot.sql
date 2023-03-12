DROP TABLE IF EXISTS "parking"."slots";

CREATE SEQUENCE "parking".slot_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;
CREATE TABLE IF NOT EXISTS "parking"."slots" (
    id BIGINT DEFAULT nextval('"parking".slot_id_seq'::regclass),
    "floorId" INT,
    "slotNumber" INT,
    "isAvailable" BOOLEAN DEFAULT false,
    "active" BOOLEAN DEFAULT true,
    "deleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "createdBy" CHARACTER VARYING,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updatedBy" CHARACTER VARYING,

    CONSTRAINT "pk_slots" PRIMARY KEY ("id"),
    CONSTRAINT "fk_slots_floor" FOREIGN KEY ("floorId") REFERENCES "parking"."floors"(id)
);
