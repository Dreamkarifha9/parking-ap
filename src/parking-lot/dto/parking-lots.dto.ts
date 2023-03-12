import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/shared/interfaces';
import { ParkingLotDto } from './parking-lot.dto';

export class ParkingLotsDto implements IResponse<ParkingLotDto[]> {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    error: string[];

    @ApiProperty({
        type: ParkingLotDto,
        isArray: true,
    })
    data: ParkingLotDto[];

    @ApiProperty()
    currentPage?: number;

    @ApiProperty()
    perPage?: number;

    @ApiProperty()
    totalPage?: number;

    @ApiProperty()
    total?: number;
}
