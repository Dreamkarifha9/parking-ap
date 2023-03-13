import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseSearchDataDto } from 'src/shared/dtos';

export class SearchBlockDto extends BaseSearchDataDto {
    @ApiPropertyOptional()
    parkingLotId: number;
}
