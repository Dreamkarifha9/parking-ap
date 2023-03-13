import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: 'vw_parking_lots',
    schema: 'parking',
    synchronize: false,
})
export class VWParkingLot {
    @ViewColumn()
    parkingLotId?: number;

    @ViewColumn()
    parkingName?: string;

    @ViewColumn()
    totalParkingSlot?: number;

    @ViewColumn()
    totalUsedParkingSlot?: number;

    @ViewColumn()
    isParkingFull?: number;
}
