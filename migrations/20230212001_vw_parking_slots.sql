DROP VIEW IF EXISTS "parking".vw_parking_slots;
CREATE OR REPLACE VIEW "parking".vw_parking_slots AS
SELECT 
  pl."id" as "parkingLotId",
  b."id" as "blockId",
  b."blockCode",    
  b."blockSize",
  f."id" as "floorId",
  f."floorNumber",
  f."numberOfSlot",
  s."id" as "slotId",
  s."slotNumber",
  s."isAvailable" AS "slotIsAvailable",
  s."active",
  s."deleted",
  s."createdAt" AS "createdAt",
  s."createdBy" AS "createdBy",
  s."updatedAt" AS "updatedAt",
  s."updatedBy" AS "updatedBy"
FROM parking."slots" s
  LEFT JOIN parking.floors f ON f.id = s."floorId" and f.active = true and f.deleted = false
  left join parking.blocks b on b.id = f."blockId" and b.active = true and b.deleted = false
  left join parking.parking_lot pl on pl.id = b."parkingLotId" and pl.active = true and pl.deleted = false;