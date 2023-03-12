import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { BaseSearchDataDto } from 'src/shared/dtos';
import { ECarSize } from 'src/shared/enums';

export class SearchVWParkingSlotDto extends BaseSearchDataDto {
    @ApiPropertyOptional()
    numberPlate?: string;

    @ApiPropertyOptional({
        type: String,
        enum: ECarSize,
    })
    blockSize?: ECarSize;
}
