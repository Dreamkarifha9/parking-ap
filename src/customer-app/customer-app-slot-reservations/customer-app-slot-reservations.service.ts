import { Injectable, Logger } from '@nestjs/common';
import { ParkingSlotReservationService } from 'src/parking-slot-reservation/parking-slot-reservation.service';
import { CreateCustomerAppSlotReservationDto } from './dto/create-customer-app-slot-reservation.dto';
import { UpdateCustomerAppSlotReservationDto } from './dto/update-customer-app-slot-reservation.dto';

@Injectable()
export class CustomerAppSlotReservationsService {
  private readonly logger: Logger = new Logger(
    CustomerAppSlotReservationsService.name,
  );
  constructor(
    private readonly parkingSlotReservationService: ParkingSlotReservationService,
  ) { }
  create(
    createCustomerAppSlotReservationDto: CreateCustomerAppSlotReservationDto,
  ) {
    this.parkingSlotReservationService.checkIn(
      createCustomerAppSlotReservationDto,
    );
    return 'This action adds a new customerAppSlotReservation';
  }

  findAll() {
    return `This action returns all customerAppSlotReservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerAppSlotReservation`;
  }

  update(
    id: number,
    updateCustomerAppSlotReservationDto: UpdateCustomerAppSlotReservationDto,
  ) {
    return `This action updates a #${id} customerAppSlotReservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerAppSlotReservation`;
  }
}
