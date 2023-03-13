import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDataDto } from '../../shared/dtos';
import { ECarSize } from '../../shared/enums';

export class ParkingSlotReservationDto extends BaseDataDto {
    @ApiProperty()
    @IsString()
    @Type(() => String)
    id: string;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    slotId: number;

    @ApiProperty()
    @Type(() => Date)
    @IsOptional()
    startTimestamp: Date;

    @ApiPropertyOptional()
    @Type(() => Date)
    @IsOptional()
    exitTimestamp?: Date;

    @ApiProperty({ default: 0 })
    @IsNumber()
    @Type(() => Number)
    durationInMinutes: number;

    @ApiPropertyOptional()
    @Type(() => Date)
    @IsOptional()
    bookingDate?: Date;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    numberPlate: string;

    @ApiProperty({
        type: String,
        enum: ECarSize,
    })
    @IsEnum(ECarSize, { each: true })
    carSize: ECarSize;
}
