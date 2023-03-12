import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { BaseDataDto } from 'src/shared/dtos';

export class VWParkingSlotDto extends BaseDataDto {
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
    blockId?: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    blockCode?: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    blockSize?: string;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    carSize?: string;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    floorId?: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    floorNumber?: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    numberOfSlot?: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    numberPlate?: string;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    slotId?: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    slotNumber?: number;

    @ApiProperty()
    @IsBoolean()
    @Type(() => Boolean)
    slotIsAvailable?: boolean;
}
