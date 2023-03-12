import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLot } from './entities/parking-lot.entity';
import { ParkingLotService } from './parking-lot.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingLot])],
  providers: [ParkingLotService],
  exports: [ParkingLotService],
})
export class ParkingLotModule { }
