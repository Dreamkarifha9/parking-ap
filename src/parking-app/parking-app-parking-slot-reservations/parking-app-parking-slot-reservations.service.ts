import { Injectable, Logger } from '@nestjs/common';

import { SearchParkingSlotReservationDto } from 'src/parking-slot-reservation/dto/search-parking-slot-reservation.dto';
import { ParkingSlotReservationService } from 'src/parking-slot-reservation/parking-slot-reservation.service';

@Injectable()
export class ParkingAppParkingSlotReservationsService {
  private readonly logger: Logger = new Logger(
    ParkingAppParkingSlotReservationsService.name,
  );
  constructor(
    private readonly parkingSlotReservationService: ParkingSlotReservationService,
  ) { }

  findAll(query: SearchParkingSlotReservationDto) {
    return this.parkingSlotReservationService.findAll(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingAppParkingSlotReservation`;
  }
}
