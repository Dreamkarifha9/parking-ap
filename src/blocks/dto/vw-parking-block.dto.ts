import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class VWParkingBlockDto {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    floorNumber?: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    parkingLotId?: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    blockCode?: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    blockSize?: string;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalFloorFull?: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    totalUsedParkingSlot?: number;

    @ApiProperty()
    @IsBoolean()
    @Type(() => Boolean)
    isBlockFull?: boolean;
}
