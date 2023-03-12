import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';
import { SlotsService } from './slots.service';
import { VWParkingSlotsService } from './vw-parking-slots.service';

@Module({
  imports: [TypeOrmModule.forFeature([Slot])],
  providers: [SlotsService],
  exports: [SlotsService, VWParkingSlotsService],
})
export class SlotsModule { }
