import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { TransformBoolean } from 'src/shared/decorators';

import { BaseSearchDataDto } from 'src/shared/dtos';
import { ECarSize } from 'src/shared/enums';

export class SearchVWParkingSlotDto extends BaseSearchDataDto {
    @ApiPropertyOptional()
    numberPlate?: string;

    @ApiPropertyOptional()
    floorNumber?: number;

    @ApiPropertyOptional()
    slotNumber?: number;

    @ApiPropertyOptional({
        type: String,
        enum: ECarSize,
    })
    blockSize?: ECarSize;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @TransformBoolean()
    slotIsAvailable?: boolean;
}
