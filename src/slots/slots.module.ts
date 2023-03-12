import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';
import { VWParkingSlot } from './entities/vw-parking-slot.entity';

import { SlotsService } from './slots.service';
import { VWParkingSlotsService } from './vw-parking-slots.service';

@Module({
  imports: [TypeOrmModule.forFeature([Slot, VWParkingSlot])],
  providers: [SlotsService, VWParkingSlotsService],
  exports: [SlotsService, VWParkingSlotsService],
})
export class SlotsModule { }
