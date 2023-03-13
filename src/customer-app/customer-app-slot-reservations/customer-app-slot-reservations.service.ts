import { Injectable, Logger } from '@nestjs/common';
import { ParkingSlotReservationService } from 'src/parking-slot-reservation/parking-slot-reservation.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Injectable()
export class CustomerAppSlotReservationsService {
  private readonly logger: Logger = new Logger(
    CustomerAppSlotReservationsService.name,
  );
  constructor(
    private readonly parkingSlotReservationService: ParkingSlotReservationService,
  ) { }
  async checkIn(checkInDto: CheckInDto) {
    return await this.parkingSlotReservationService.checkIn(checkInDto);
  }

  async checkOut(checkOutDto: CheckOutDto) {
    return await this.parkingSlotReservationService.checkOut(
      checkOutDto.numberPlate,
    );
  }
}
