import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotsModule } from 'src/slots/slots.module';
import { ParkingSlotReservation } from './entities/parking-slot-reservation.entity';
import { ParkingSlotReservationService } from './parking-slot-reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingSlotReservation]),
    forwardRef(() => SlotsModule),
  ],
  providers: [ParkingSlotReservationService],
  exports: [ParkingSlotReservationService],
})
export class ParkingSlotReservationModule { }
