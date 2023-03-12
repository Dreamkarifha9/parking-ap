import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';
import { BaseDataDto } from 'src/shared/dtos';

export class FloorDto extends BaseDataDto {
    @ApiProperty({ default: null })
    @IsNumber()
    @Type(() => Number)
    id: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    blockId: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    floorNumber: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    numberOfSlot: number;

    @ApiProperty({ default: false })
    @IsBoolean()
    @Type(() => Boolean)
    isFloorFull: boolean;
}
