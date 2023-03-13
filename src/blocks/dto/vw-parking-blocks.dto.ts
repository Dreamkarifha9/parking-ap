import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/shared/interfaces';
import { VWParkingBlockDto } from './vw-parking-block.dto';

export class VWParkingBlocksDto implements IResponse<VWParkingBlockDto[]> {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    error: string[];

    @ApiProperty({
        type: VWParkingBlockDto,
        isArray: true,
    })
    data: VWParkingBlockDto[];

    @ApiProperty()
    currentPage?: number;

    @ApiProperty()
    perPage?: number;

    @ApiProperty()
    totalPage?: number;

    @ApiProperty()
    total?: number;
}
