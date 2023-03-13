import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {
    calculatePaging,
    createOrderForBuilder,
    createOrQueriesForBuilder,
    getCommonQueryForBuilder,
} from 'src/shared/helpers';

import { Repository } from 'typeorm';
import { SearchVWParkingBlockDto } from './dto/search-vw-parking-slot.dto';
import { VWParkingBlockDto } from './dto/vw-parking-block.dto';
import { VWParkingBlocksDto } from './dto/vw-parking-blocks.dto';

import { VWParkingBlock } from './entities/vw-parking-block.entity';

@Injectable()
export class VWParkingBlocks {
    private readonly logger: Logger = new Logger(VWParkingBlocks.name);
    constructor(
        @InjectRepository(VWParkingBlock)
        private readonly vWParkingBlocksRepository: Repository<VWParkingBlock>,
    ) { }

    async findAll(search: SearchVWParkingBlockDto): Promise<VWParkingBlocksDto> {
        const { page, size, query, sortBy, orderBy } = search;

        const { querySql, params } = createOrQueriesForBuilder(query, [
            'vw_parking_blocks."slotId"',
        ]);

        const _orderBlockSize = createOrderForBuilder(
            'vw_parking_blocks',
            sortBy || '"blockSize"',
            orderBy || 'ASC',
        );
        const _orderFloorNumber = createOrderForBuilder(
            'vw_parking_blocks',
            sortBy || '"floorNumber"',
            orderBy || 'ASC',
        );
        const { skip, limit } = calculatePaging(page, size);
        // NOTED: Refered to this stackoverfow [https://stackoverflow.com/a/57648345]
        const builder =
            this.vWParkingBlocksRepository.createQueryBuilder('vw_parking_blocks');
        builder.select([
            'vw_parking_blocks.floorNumber',
            'vw_parking_blocks.parkingLotId',
            'vw_parking_blocks.blockCode',
            'vw_parking_blocks.blockSize',
            'vw_parking_blocks.totalFloorFull',
            'vw_parking_blocks.totalUsedParkingSlot',
            'vw_parking_blocks.isBlockFull',
        ]);

        if (querySql) {
            builder.where(querySql, params);
        }

        const [data, count] = await builder
            .orderBy({ ..._orderBlockSize, ..._orderFloorNumber })
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        const newData = plainToInstance(VWParkingBlockDto, data);

        const result = new VWParkingBlocksDto();
        result.currentPage = page;
        result.total = count;
        result.perPage = size;
        result.success = true;
        result.error = [];
        result.totalPage = Math.ceil(count / size);
        result.data = newData;
        return result;
    }

    async findOneBySearch(q: Partial<VWParkingBlockDto>) {
        return this.vWParkingBlocksRepository.findOneBy({ ...q });
    }
}
