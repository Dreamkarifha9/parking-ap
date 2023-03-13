 CREATE OR REPLACE VIEW parking.vw_parking_lots
AS SELECT pl.id as "parkingLotId", pl."name" as "parkingName",
       ( SELECT count(vps."parkingLotId") AS count
           FROM parking.vw_parking_slots vps where vps."parkingLotId" = pl.id) AS "totalParkingSlot",
                  ( SELECT count(vps."parkingLotId") AS count
           FROM parking.vw_parking_slots vps where vps."parkingLotId" = pl.id and vps."slotIsAvailable" = true) AS "totalUsedParkingSlot",
          CASE
            WHEN (( SELECT count(vps."parkingLotId") AS count
           FROM parking.vw_parking_slots vps where vps."parkingLotId" = pl.id)) = (( SELECT count(vps."parkingLotId") AS count
           FROM parking.vw_parking_slots vps where vps."slotIsAvailable" = true)) THEN true
            ELSE false
        END AS "isParkingFull"
   FROM parking.parking_lot pl;