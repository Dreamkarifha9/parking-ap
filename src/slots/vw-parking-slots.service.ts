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
import { SearchVWParkingSlotDto } from './dto/search-vw-parking-slot.dto';
import { VWParkingSlotDto } from './dto/vw-parking-slot.dto';
import { VWParkingSlotsDto } from './dto/vw-parking-slots.dto';

import { VWParkingSlot } from './entities/vw-parking-slot.entity';

@Injectable()
export class VWParkingSlotsService {
    private readonly logger: Logger = new Logger(VWParkingSlotsService.name);
    constructor(
        @InjectRepository(VWParkingSlot)
        private readonly vWParkingSlotsRepository: Repository<VWParkingSlot>,
    ) { }

    async findAll(search: SearchVWParkingSlotDto): Promise<VWParkingSlotsDto> {
        const { page, size, query, active, deleted, sortBy, orderBy } = search;

        const { commonQueries, commonParams } = getCommonQueryForBuilder(
            'vw_parking_slots',
            deleted,
            active,
        );

        const { querySql, params } = createOrQueriesForBuilder(query, [
            'vw_parking_slots."slotId"',
        ]);

        const _orderBlockSize = createOrderForBuilder(
            'vw_parking_slots',
            sortBy || '"blockSize"',
            orderBy || 'ASC',
        );
        const _orderFloorNumber = createOrderForBuilder(
            'vw_parking_slots',
            sortBy || '"floorNumber"',
            orderBy || 'ASC',
        );
        const { skip, limit } = calculatePaging(page, size);
        // NOTED: Refered to this stackoverfow [https://stackoverflow.com/a/57648345]
        const builder =
            this.vWParkingSlotsRepository.createQueryBuilder('vw_parking_slots');

        builder.where(commonQueries, commonParams);

        if (querySql) {
            builder.andWhere(querySql, params);
        }

        const [data, count] = await builder
            .orderBy({ ..._orderBlockSize, ..._orderFloorNumber })
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        const newData = plainToInstance(VWParkingSlotDto, data);

        const result = new VWParkingSlotsDto();
        result.currentPage = page;
        result.total = count;
        result.perPage = size;
        result.success = true;
        result.error = [];
        result.totalPage = Math.ceil(count / size);
        result.data = newData;
        return result;
    }
    async findNearbyExit(): Promise<VWParkingSlotDto> {
        const row = await this.vWParkingSlotsRepository
            .createQueryBuilder('vw_parking_slots')
            .select()
            .where('vw_parking_slots.slotIsAvailable = :slotIsAvailable', {
                slotIsAvailable: false,
            })
            .orderBy('"vw_parking_slots"."blockSize"', 'ASC')
            .addOrderBy('"vw_parking_slots"."floorNumber"', 'ASC')
            .getOne();
        return plainToInstance(VWParkingSlotDto, row);
    }
}
