import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ECarSize } from 'src/shared/enums';
import {
  calculatePaging,
  createOrderForBuilder,
  createOrQueriesForBuilder,
  getCommonQueryForBuilder,
} from './../shared/helpers';

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
    const {
      page,
      size,
      query,
      active,
      deleted,
      sortBy,
      orderBy,
      slotNumber,
      floorNumber,
      numberPlate,
      blockSize,
      slotIsAvailable,
    } = search;

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
    builder.select([
      'vw_parking_slots.numberPlate',
      'vw_parking_slots.parkingName',
      'vw_parking_slots.blockSize',
      'vw_parking_slots.carSize',
      'vw_parking_slots.blockId',
      'vw_parking_slots.blockCode',
      'vw_parking_slots.floorNumber',
      'vw_parking_slots.slotNumber',
      'vw_parking_slots.slotIsAvailable',
      'vw_parking_slots.active',
      'vw_parking_slots.deleted',
      'vw_parking_slots.createdAt',
      'vw_parking_slots.createdBy',
      'vw_parking_slots.updatedAt',
      'vw_parking_slots.updatedBy',
    ]);

    builder.where(commonQueries, commonParams);

    if (querySql) {
      builder.andWhere(querySql, params);
    }
    if (slotNumber) {
      builder.andWhere('vw_parking_slots.slotNumber = :slotNumber', {
        slotNumber,
      });
    }
    if (floorNumber) {
      builder.andWhere('vw_parking_slots.floorNumber = :floorNumber', {
        floorNumber,
      });
    }
    if (numberPlate) {
      builder.andWhere('vw_parking_slots.numberPlate = :numberPlate', {
        numberPlate,
      });
    }
    if (blockSize) {
      builder.andWhere('vw_parking_slots.blockSize = :blockSize', {
        blockSize,
      });
    }
    if (slotIsAvailable != undefined) {
      builder.andWhere('vw_parking_slots.slotIsAvailable = :slotIsAvailable', {
        slotIsAvailable,
      });
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
  async findNearbyExit(carSize: ECarSize): Promise<VWParkingSlotDto> {
    const row = await this.vWParkingSlotsRepository
      .createQueryBuilder('vw_parking_slots')
      .select()
      .where('vw_parking_slots.slotIsAvailable = :slotIsAvailable', {
        slotIsAvailable: false,
      })
      .andWhere('vw_parking_slots.blockSize = :blockSize', {
        blockSize: carSize,
      })
      .orderBy('"vw_parking_slots"."blockSize"', 'ASC')
      .addOrderBy('"vw_parking_slots"."floorNumber"', 'ASC')
      .getOne();
    return plainToInstance(VWParkingSlotDto, row);
  }

  async findOneBySearch(q: Partial<VWParkingSlotDto>) {
    return this.vWParkingSlotsRepository.findOneBy({ ...q });
  }
}
