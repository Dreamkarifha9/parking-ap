import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: 'vw_parking_blocks',
    schema: 'parking',
    synchronize: false,
})
export class VWParkingBlock {
    @ViewColumn()
    floorNumber?: number;

    @ViewColumn()
    parkingLotId?: number;

    @ViewColumn()
    blockCode?: string;

    @ViewColumn()
    blockSize?: string;

    @ViewColumn()
    totalFloorFull?: number;

    @ViewColumn()
    totalUsedParkingSlot?: number;

    @ViewColumn()
    isBlockFull?: boolean;
}
