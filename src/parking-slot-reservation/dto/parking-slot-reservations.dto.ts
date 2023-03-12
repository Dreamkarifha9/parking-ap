import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/shared/interfaces';
import { ParkingSlotReservationDto } from './parking-slot-reservation.dto';

export class ParkingSlotReservationsDto
    implements IResponse<ParkingSlotReservationDto[]>
{
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    error: string[];

    @ApiProperty({
        type: ParkingSlotReservationDto,
        isArray: true,
    })
    data: ParkingSlotReservationDto[];

    @ApiProperty()
    currentPage?: number;

    @ApiProperty()
    perPage?: number;

    @ApiProperty()
    totalPage?: number;

    @ApiProperty()
    total?: number;
}
