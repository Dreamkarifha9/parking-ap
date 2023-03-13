import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VWParkingSlotsService } from 'src/slots/vw-parking-slots.service';
import { Repository } from 'typeorm';
import { CreateParkingSlotReservationDto } from './dto/create-parking-slot-reservation.dto';
import { UpdateParkingSlotReservationDto } from './dto/update-parking-slot-reservation.dto';
import { ParkingSlotReservation } from './entities/parking-slot-reservation.entity';
import { v4 as uuid } from 'uuid';
import { SlotsService } from 'src/slots/slots.service';
import { ParkingSlotReservationDto } from './dto/parking-slot-reservation.dto';
import {
  calculatePaging,
  createOrderForBuilder,
  createOrQueriesForBuilder,
  getCommonQueryForBuilder,
} from 'src/shared/helpers';
import { plainToInstance } from 'class-transformer';
import { ParkingSlotReservationsDto } from './dto/parking-slot-reservations.dto';
import { SearchParkingSlotReservationDto } from './dto/search-parking-slot-reservation.dto';
@Injectable()
export class ParkingSlotReservationService {
  private readonly logger: Logger = new Logger(
    ParkingSlotReservationService.name,
  );
  constructor(
    @InjectRepository(ParkingSlotReservation)
    private readonly parkingSlotReservationRepository: Repository<ParkingSlotReservation>,
    private readonly vWParkingSlotsService: VWParkingSlotsService,
    private readonly slotsService: SlotsService,
  ) { }
  async checkIn(
    createParkingSlotReservationDto: CreateParkingSlotReservationDto,
  ) {
    const plateNumber = await this.vWParkingSlotsService.findOneBySearch({
      numberPlate: createParkingSlotReservationDto.numberPlate,
      active: true,
      deleted: false,
      slotIsAvailable: true,
    });
    if (plateNumber) {
      throw new HttpException(
        `number Plate Has Already isUsed.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const findNearbyExit = await this.vWParkingSlotsService.findNearbyExit(
      createParkingSlotReservationDto.carSize,
    );
    if (findNearbyExit) {
      const { slotId } = findNearbyExit;
      const mapingDto = {
        id: uuid(),
        slotId,
        starttimestamp: new Date(),
        bookingDate: new Date(),
        ...createParkingSlotReservationDto,
      };
      const newParkingSlotReservation =
        this.parkingSlotReservationRepository.create(mapingDto);
      this.logger.debug(
        `newParkingSlotReservation ${JSON.stringify(
          newParkingSlotReservation,
        )}`,
      );
      await this.parkingSlotReservationRepository.save(
        newParkingSlotReservation,
      );
      // update status isAvailable in slot table
      const findSlot = await this.slotsService.findOne(slotId);
      await this.slotsService.update(findSlot, { isAvailable: true });
      this.logger.debug(`findNearbyExit ${JSON.stringify(findNearbyExit)}`);
      return { suscuess: true };
    } else {
      throw new HttpException(`slot has been used up`, HttpStatus.NOT_FOUND);
    }
  }

  async findOneBySearch(q: Partial<ParkingSlotReservationDto>) {
    return this.parkingSlotReservationRepository.findOneBy({ ...q });
  }

  async findAll(
    search: SearchParkingSlotReservationDto,
  ): Promise<ParkingSlotReservationsDto> {
    const {
      page,
      size,
      query,
      active,
      deleted,
      sortBy,
      orderBy,
      numberPlate,
      slotId,
      carSize,
    } = search;

    const { commonQueries, commonParams } = getCommonQueryForBuilder(
      'parking_slot_reservations',
      deleted,
      active,
    );

    const { querySql, params } = createOrQueriesForBuilder(query, [
      'parking_slot_reservations."id"',
    ]);

    const _order = createOrderForBuilder(
      'parking_slot_reservations',
      sortBy || '"carSize"',
      orderBy || 'ASC',
    );

    const { skip, limit } = calculatePaging(page, size);
    // NOTED: Refered to this stackoverfow [https://stackoverflow.com/a/57648345]
    const builder = this.parkingSlotReservationRepository.createQueryBuilder(
      'parking_slot_reservations',
    );
    builder.select([
      'parking_slot_reservations.id',
      'parking_slot_reservations.slotId',
      'parking_slot_reservations.startTimestamp',
      'parking_slot_reservations.exitTimestamp',
      'parking_slot_reservations.durationInMinutes',
      'parking_slot_reservations.bookingDate',
      'parking_slot_reservations.numberPlate',
      'parking_slot_reservations.carSize',
      'parking_slot_reservations.active',
      'parking_slot_reservations.deleted',
      'parking_slot_reservations.createdAt',
      'parking_slot_reservations.createdBy',
      'parking_slot_reservations.updatedAt',
      'parking_slot_reservations.updatedBy',
    ]);

    builder.where(commonQueries, commonParams);

    if (querySql) {
      builder.andWhere(querySql, params);
    }

    if (numberPlate) {
      builder.andWhere('parking_slot_reservations.numberPlate = :numberPlate', {
        numberPlate,
      });
    }

    if (carSize) {
      builder.andWhere('parking_slot_reservations.carSize = :carSize', {
        carSize,
      });
    }

    if (slotId) {
      builder.andWhere('parking_slot_reservations.slotId = :slotId', {
        slotId,
      });
    }

    const [data, count] = await builder
      .orderBy({ ..._order })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const newData = plainToInstance(ParkingSlotReservationDto, data);

    const result = new ParkingSlotReservationsDto();
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
    return `This action returns a #${id} parkingSlotReservation`;
  }

  update(
    id: number,
    updateParkingSlotReservationDto: UpdateParkingSlotReservationDto,
  ) {
    return `This action updates a #${id} parkingSlotReservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingSlotReservation`;
  }
}
