DROP VIEW IF EXISTS "parking".vw_parking_slots;
CREATE OR REPLACE VIEW parking.vw_parking_slots
AS SELECT pl.id AS "parkingLotId",
    pl.name AS "parkingName",
    b.id AS "blockId",
    b."blockCode",
    b."blockSize",
    f.id AS "floorId",
    f."floorNumber",
    f."numberOfSlot",
    case when s."isAvailable" = true then
    (select psr."numberPlate" from parking.parking_slot_reservations psr where psr."slotId" = s.id order by "createdAt" desc limit 1)
    else null
    end as "numberPlate",
        case when s."isAvailable" = true then
    (select psr."carSize" from parking.parking_slot_reservations psr where psr."slotId" = s.id order by "createdAt" desc limit 1)
    else null
    end as "carSize",
    s.id AS "slotId",
    s."slotNumber",
    s."isAvailable" AS "slotIsAvailable",
    s.active,
    s.deleted,
    s."createdAt",
    s."createdBy",
    s."updatedAt",
    s."updatedBy"
   FROM parking.slots s
     LEFT JOIN parking.floors f ON f.id = s."floorId" AND f.active = true AND f.deleted = false
     LEFT JOIN parking.blocks b ON b.id = f."blockId" AND b.active = true AND b.deleted = false
     LEFT JOIN parking.parking_lot pl ON pl.id = b."parkingLotId" AND pl.active = true AND pl.deleted = false;