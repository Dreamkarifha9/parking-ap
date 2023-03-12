import { forwardRef, Module } from '@nestjs/common';
import { CustomerAppSlotReservationsService } from './customer-app-slot-reservations.service';
import { CustomerAppSlotReservationsController } from './customer-app-slot-reservations.controller';
import { ParkingSlotReservationModule } from 'src/parking-slot-reservation/parking-slot-reservation.module';

@Module({
  imports: [forwardRef(() => ParkingSlotReservationModule)],
  controllers: [CustomerAppSlotReservationsController],
  providers: [CustomerAppSlotReservationsService],
})
export class CustomerAppSlotReservationsModule { }
