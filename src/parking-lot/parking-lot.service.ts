import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {
  calculatePaging,
  createOrderForBuilder,
  createOrQueriesForBuilder,
  getCommonQueryForBuilder,
} from 'src/shared/helpers';
import { ILike, Repository } from 'typeorm';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { ParkingLotDto } from './dto/parking-lot.dto';
import { ParkingLotsDto } from './dto/parking-lots.dto';
import { SearchParkingLotDto } from './dto/search-parking-lot.dto';
import { UpdateParkingLotDto } from './dto/update-parking-lot.dto';
import { ParkingLot } from './entities/parking-lot.entity';

@Injectable()
export class ParkingLotService {
  private readonly logger: Logger = new Logger(ParkingLotService.name);
  constructor(
    @InjectRepository(ParkingLot)
    private readonly parkingLotRepository: Repository<ParkingLot>,
  ) { }
  async create(createParkingLotDto: CreateParkingLotDto) {
    const parkingLot: ParkingLot = {
      id: null,
      ...createParkingLotDto,
      createdAt: new Date(),
      createdBy: 'system',
    };
    await this.checkDuplicateParkingLot(parkingLot.name);
    const nweParkingLot = this.parkingLotRepository.create(parkingLot);
    this.logger.debug(`nweParkingLot ${JSON.stringify(nweParkingLot.id)}`);
    const result = await this.parkingLotRepository.save(nweParkingLot);
    this.logger.debug(`result ${JSON.stringify(result)}`);

    return plainToInstance(ParkingLotDto, result);
  }

  async checkDuplicateParkingLot(name: string) {
    const foundParkingLot = await this.parkingLotRepository.findOneBy({
      name: ILike(name),
      active: true,
      deleted: false,
    });
    this.logger.debug(`foundParkingLot ${JSON.stringify(foundParkingLot)}`);
    if (foundParkingLot)
      throw new HttpException(
        `parkingLot name has been used.`,
        HttpStatus.CONFLICT,
      );
    return foundParkingLot;
  }

  async findAll(search: SearchParkingLotDto): Promise<ParkingLotsDto> {
    const { page, size, query, active, deleted, sortBy, orderBy } = search;

    const { commonQueries, commonParams } = getCommonQueryForBuilder(
      'parking_lot',
      deleted,
      active,
    );

    const { querySql, params } = createOrQueriesForBuilder(query, [
      'parking_lot."id"',
    ]);

    const _order = createOrderForBuilder(
      'parking_lot',
      sortBy || '"id"',
      orderBy || 'ASC',
    );

    const { skip, limit } = calculatePaging(page, size);
    // NOTED: Refered to this stackoverfow [https://stackoverflow.com/a/57648345]
    const builder = this.parkingLotRepository.createQueryBuilder('parking_lot');
    builder.select([
      'parking_lot.id',
      'parking_lot.name',
      'parking_lot.active',
      'parking_lot.deleted',
      'parking_lot.createdAt',
      'parking_lot.createdBy',
      'parking_lot.updatedAt',
      'parking_lot.updatedBy',
    ]);

    builder.where(commonQueries, commonParams);

    if (querySql) {
      builder.andWhere(querySql, params);
    }

    const [data, count] = await builder
      .orderBy({ ..._order })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const newData = plainToInstance(ParkingLotDto, data);

    const result = new ParkingLotsDto();
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
    return `This action returns a #${id} parkingLot`;
  }

  update(id: number, updateParkingLotDto: UpdateParkingLotDto) {
    return `This action updates a #${id} parkingLot`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingLot`;
  }
}
