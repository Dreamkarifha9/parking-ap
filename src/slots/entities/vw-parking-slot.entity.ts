import { BasicViewData } from 'src/shared/entities';
import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'vw_parking_slots', schema: 'parking', synchronize: false })
export class VWParkingSlot extends BasicViewData {
    @ViewColumn()
    parkingLotId?: number;

    @ViewColumn()
    parkingName?: string;

    @ViewColumn()
    blockId?: number;

    @ViewColumn()
    blockCode?: string;

    @ViewColumn()
    blockSize?: string;

    @ViewColumn()
    carSize?: string;

    @ViewColumn()
    floorId?: number;

    @ViewColumn()
    floorNumber?: number;

    @ViewColumn()
    numberOfSlot?: number;

    @ViewColumn()
    numberPlate?: string;

    @ViewColumn()
    slotId?: number;

    @ViewColumn()
    slotNumber?: number;

    @ViewColumn()
    slotIsAvailable?: boolean;
}
