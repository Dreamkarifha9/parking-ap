import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {
  calculatePaging,
  createOrderForBuilder,
  createOrQueriesForBuilder,
  getCommonQueryForBuilder,
} from 'src/shared/helpers';
import { In, Repository } from 'typeorm';
import { CreateFloorDto } from './dto/create-floor.dto';
import { FloorDto } from './dto/floor.dto';
import { FloorsDto } from './dto/floors.dto';
import { SearchFloor } from './dto/search-block.dto';

import { UpdateFloorDto } from './dto/update-floor.dto';
import { Floor } from './entities/floor.entity';

@Injectable()
export class FloorsService {
  private readonly logger: Logger = new Logger(FloorsService.name);
  constructor(
    @InjectRepository(Floor)
    private readonly floorsRepository: Repository<Floor>,
  ) { }
  async create(createFloorDto: CreateFloorDto[]) {
    const isFloor = this.hasDuplicates(
      createFloorDto,
      'blockId',
      'floorNumber',
    );
    if (isFloor)
      throw new HttpException(
        'blockId and floorNumber in array duplicate',
        HttpStatus.BAD_REQUEST,
      );

    const newArray = [];
    for (let i = 0; i < createFloorDto.length; i++) {
      await this.checkDuplicateFloor(
        createFloorDto[i].blockId,
        createFloorDto[i].floorNumber,
      );
      const mapDto = {
        blockId: createFloorDto[i].blockId,
        floorNumber: createFloorDto[i].floorNumber,
        numberOfSlot: createFloorDto[i].numberOfSlot,
        createdAt: new Date(),
      };
      newArray.push(mapDto);
    }
    const newFloors = this.floorsRepository.create(newArray);
    this.logger.debug(`newFloors ${JSON.stringify(newFloors)}`);
    const result = await this.floorsRepository.save(newFloors);

    return plainToInstance(CreateFloorDto, result);
  }

  async checkDuplicateFloor(blockId: number, floorNumber: number) {
    const foundFloor = await this.floorsRepository.findOneBy({
      blockId,
      floorNumber,
      active: true,
      deleted: false,
    });
    this.logger.debug(`foundFloor ${JSON.stringify(foundFloor)}`);
    if (foundFloor)
      throw new HttpException(
        `blockId ${blockId} and floorNumber ${floorNumber} has been used.`,
        HttpStatus.CONFLICT,
      );
    return foundFloor;
  }

  hasDuplicates(array: any, propertyOne: string, propertyTwo: string) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (
          array[i][propertyOne] === array[j][propertyOne] &&
          array[i][propertyTwo] === array[j][propertyTwo]
        ) {
          return true; // duplicate found
        }
      }
    }
    return false; // no duplicates found
  }

  async findAll(search: SearchFloor): Promise<FloorsDto> {
    const { page, size, query, active, deleted, sortBy, orderBy, blockIds } =
      search;

    const { commonQueries, commonParams } = getCommonQueryForBuilder(
      'floors',
      deleted,
      active,
    );

    const { querySql, params } = createOrQueriesForBuilder(query, [
      'floors."id"',
    ]);

    const _order = createOrderForBuilder(
      'floors',
      sortBy || '"id"',
      orderBy || 'ASC',
    );

    const { skip, limit } = calculatePaging(page, size);
    // NOTED: Refered to this stackoverfow [https://stackoverflow.com/a/57648345]
    const builder = this.floorsRepository.createQueryBuilder('floors');
    builder.select([
      'floors.id',
      'floors.blockId',
      'floors.floorNumber',
      'floors.numberOfSlot',
      'floors.active',
      'floors.deleted',
      'floors.createdAt',
      'floors.createdBy',
      'floors.updatedAt',
      'floors.updatedBy',
    ]);

    builder.where(commonQueries, commonParams);

    if (querySql) {
      builder.andWhere(querySql, params);
    }

    if (blockIds) {
      builder.andWhere('floors.blockId IN (:...blockIds)', {
        blockIds: blockIds,
      });
    }

    const [data, count] = await builder
      .orderBy({ ..._order })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const newData = plainToInstance(FloorDto, data);

    const result = new FloorsDto();
    result.currentPage = page;
    result.total = count;
    result.perPage = size;
    result.success = true;
    result.error = [];
    result.totalPage = Math.ceil(count / size);
    result.data = newData;
    return result;
  }

  findOne(id: number) {
    return this.floorsRepository.findOne({ where: { id } });
  }
  async findOneBySearch(q: Partial<FloorDto>) {
    return this.floorsRepository.findOneBy({ ...q });
  }

  async update(updateFloorDto: UpdateFloorDto[]) {
    // Reason => https://github.com/typeorm/typeorm/issues/5131#issuecomment-1030895756
    for (let i = 0; i < updateFloorDto.length; i++) {
      const { id: floorId, blockId } = updateFloorDto[i];
      const foundFloor = await this.findOneBySearch({ id: floorId, blockId });
      if (!foundFloor)
        throw new HttpException(
          `floorId or blockId notFound`,
          HttpStatus.BAD_REQUEST,
        );
      const mapObject = Object.assign(foundFloor, updateFloorDto[i]);
      return await this.floorsRepository.update(floorId, {
        ...mapObject,
        updatedAt: new Date(),
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} floor`;
  }
}
