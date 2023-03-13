import { ApiPropertyOptional } from '@nestjs/swagger';

import { BaseSearchDataDto } from 'src/shared/dtos';
import { ECarSize } from 'src/shared/enums';

export class SearchParkingSlotReservationDto extends BaseSearchDataDto {
    @ApiPropertyOptional()
    slotId?: number;

    @ApiPropertyOptional()
    numberPlate?: string;

    @ApiPropertyOptional({
        type: String,
        enum: ECarSize,
    })
    carSize?: ECarSize;
}
