   CREATE OR REPLACE VIEW parking.vw_parking_blocks
AS SELECT b.id as "parkingBlockId", b."blockCode", b."parkingLotId", b."blockSize",count(b."blockCode") as "totalFloorFull",
( SELECT count(vps."parkingLotId") AS count
           FROM parking.vw_parking_slots vps where vps."slotIsAvailable" = true and vps."blockCode" = b."blockCode") AS "totalUsedParkingSlot",
             CASE
            WHEN (count(b."blockCode")) = ((  SELECT count(vps."parkingLotId") AS count
           FROM parking.vw_parking_slots vps where vps."slotIsAvailable" = true and vps."blockCode" = b."blockCode")) THEN true
            ELSE false
        END AS "isBlockFull"
           FROM parking.blocks b
           LEFT JOIN parking.floors f ON f."blockId" = b.id and f.active = true and f.deleted = false
           left join parking.slots s on s."floorId" = f.id and s.active = true and s.deleted = false
          group  by "parkingBlockId", "blockCode", "parkingLotId", "blockSize";