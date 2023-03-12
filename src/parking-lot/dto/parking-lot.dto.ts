import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseDataDto } from 'src/shared/dtos';

export class ParkingLotDto extends BaseDataDto {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    name: string;
}
