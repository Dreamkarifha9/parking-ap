import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/shared/interfaces';
import { BlockDto } from './block.dto';

export class BlocksDto implements IResponse<BlockDto[]> {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    error: string[];

    @ApiProperty({
        type: BlockDto,
        isArray: true,
    })
    data: BlockDto[];

    @ApiProperty()
    currentPage?: number;

    @ApiProperty()
    perPage?: number;

    @ApiProperty()
    totalPage?: number;

    @ApiProperty()
    total?: number;
}
