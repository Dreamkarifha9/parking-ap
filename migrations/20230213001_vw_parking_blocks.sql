CREATE OR REPLACE VIEW parking.vw_parking_blocks
AS SELECT  f."floorNumber",b."parkingLotId",b."blockCode", b."blockSize",count(b."blockSize") as "totalFloorFull",
( SELECT count(vps."parkingLotId") AS count
           FROM parking.vw_parking_slots vps where vps."slotIsAvailable" = true and vps."blockSize" = b."blockSize" and vps."floorNumber" = f."floorNumber") AS "totalUsedParkingSlot",
             CASE
            WHEN (count(b."blockSize")) = ((  SELECT count(vps."blockSize") AS count
           FROM parking.vw_parking_slots vps where vps."slotIsAvailable" = true and vps."blockSize" = b."blockSize" and vps."floorNumber" = f."floorNumber")) THEN true
            ELSE false
        END AS "isBlockFull"
           FROM parking.blocks b
           LEFT JOIN parking.floors f ON f."blockId" = b.id and f.active = true and f.deleted = false
           left join parking.slots s on s."floorId" = f.id and s.active = true and s.deleted = false
          group  by  "parkingLotId", "blockSize", "floorNumber", "blockCode";