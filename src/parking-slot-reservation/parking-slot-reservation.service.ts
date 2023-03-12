import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlotsService } from 'src/slots/slots.service';

import { Repository } from 'typeorm';
import { CreateParkingSlotReservationDto } from './dto/create-parking-slot-reservation.dto';
import { UpdateParkingSlotReservationDto } from './dto/update-parking-slot-reservation.dto';
import { ParkingSlotReservation } from './entities/parking-slot-reservation.entity';

@Injectable()
export class ParkingSlotReservationService {
  private readonly logger: Logger = new Logger(
    ParkingSlotReservationService.name,
  );
  constructor(
    @InjectRepository(ParkingSlotReservation)
    private readonly parkingSlotReservationRepository: Repository<ParkingSlotReservation>,
    private readonly slotsService: SlotsService,
  ) { }
  create(createParkingSlotReservationDto: CreateParkingSlotReservationDto) {
    return 'This action adds a new parkingSlotReservation';
  }

  findAll() {
    return `This action returns all parkingSlotReservation`;
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
