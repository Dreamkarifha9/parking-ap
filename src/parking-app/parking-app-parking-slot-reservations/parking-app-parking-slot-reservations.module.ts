import { forwardRef, Module } from '@nestjs/common';
import { ParkingAppParkingSlotReservationsService } from './parking-app-parking-slot-reservations.service';
import { ParkingAppParkingSlotReservationsController } from './parking-app-parking-slot-reservations.controller';
import { ParkingSlotReservationModule } from 'src/parking-slot-reservation/parking-slot-reservation.module';

@Module({
  imports: [forwardRef(() => ParkingSlotReservationModule)],
  controllers: [ParkingAppParkingSlotReservationsController],
  providers: [ParkingAppParkingSlotReservationsService],
})
export class ParkingAppParkingSlotReservationsModule { }
