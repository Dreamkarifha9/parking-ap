DROP TABLE IF EXISTS "parking"."parking_slot_reservations";
CREATE TABLE IF NOT EXISTS "parking"."parking_slot_reservations" (
    id uuid NOT NULL,
    "parkingSlotId" INT,
    "startTimestamp" timestamptz NOT NULL DEFAULT now(),
    "actualExit" timestamptz NOT NULL DEFAULT now(),
    "durationInMinutes" INT,
    "bookingDate" timestamptz NOT NULL DEFAULT now(),
    "numberPlate" CHARACTER VARYING NULL,
    "carSize" public."eCarSize" NOT null,
    "active" BOOLEAN DEFAULT true,
    "deleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "createdBy" CHARACTER VARYING,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "updatedBy" CHARACTER VARYING,

    CONSTRAINT "pk_parking_slot_reservations" PRIMARY KEY ("id"),
    CONSTRAINT "fk_parking_slot_reservations_parking_lot" FOREIGN KEY ("parkingSlotId") REFERENCES "parking"."parking_lot"(id)
);
