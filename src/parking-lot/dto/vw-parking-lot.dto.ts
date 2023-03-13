import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class VWParkingLotDto {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    parkingLotId?: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    parkingName?: string;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalParkingSlot?: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalUsedParkingSlot?: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    isParkingFull?: number;
}
