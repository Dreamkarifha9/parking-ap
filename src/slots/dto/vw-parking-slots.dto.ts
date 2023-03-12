import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/shared/interfaces';
import { VWParkingSlotDto } from './vw-parking-slot.dto';

export class VWParkingSlotsDto implements IResponse<VWParkingSlotDto[]> {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    error: string[];

    @ApiProperty({
        type: VWParkingSlotDto,
        isArray: true,
    })
    data: VWParkingSlotDto[];

    @ApiProperty()
    currentPage?: number;

    @ApiProperty()
    perPage?: number;

    @ApiProperty()
    totalPage?: number;

    @ApiProperty()
    total?: number;
}
