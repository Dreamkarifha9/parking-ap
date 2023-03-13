import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, Min } from 'class-validator';
import { BaseDataDto } from '../../shared/dtos';

export class SlotDto extends BaseDataDto {
    @ApiProperty({ default: null })
    @IsNumber()
    @Type(() => Number)
    id: number;

    @ApiProperty()
    @Min(1)
    @IsNumber()
    @Type(() => Number)
    floorId: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    slotNumber: number;

    @ApiProperty({ default: false })
    @IsBoolean()
    @Type(() => Boolean)
    isAvailable: boolean;
}
