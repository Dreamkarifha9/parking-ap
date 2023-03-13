import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: 'vw_parking_floors',
    schema: 'parking',
    synchronize: false,
})
export class VWFloor {
    @ViewColumn()
    floorNumber?: number;

    @ViewColumn()
    parkingLotId?: number;

    @ViewColumn()
    parkingName?: string;

    @ViewColumn()
    totalFloorFull?: number;

    @ViewColumn()
    totalUsedParkingSlot?: number;

    @ViewColumn()
    isFloorFull?: boolean;
}
