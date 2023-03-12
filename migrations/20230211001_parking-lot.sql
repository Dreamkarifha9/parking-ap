DROP TABLE IF EXISTS "parking"."parking_lot";
CREATE SEQUENCE "parking".parking_lot_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;
CREATE TABLE IF NOT EXISTS "parking"."parking_lot" (
    id BIGINT DEFAULT nextval('"parking".parking_lot_id_seq'::regclass),
    "name" CHARACTER VARYING NULL,
    "active" BOOLEAN DEFAULT true,
    "deleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "createdBy" CHARACTER VARYING,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updatedBy" CHARACTER VARYING,

    CONSTRAINT "pk_parking_lot" PRIMARY KEY ("id")
);
