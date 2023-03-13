import { ApiPropertyOptional } from '@nestjs/swagger';

import { BaseSearchDataDto } from 'src/shared/dtos';

export class SearchFloor extends BaseSearchDataDto {
    @ApiPropertyOptional({ type: [Number] })
    blockIds?: number[];
}
