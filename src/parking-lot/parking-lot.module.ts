import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingLot } from './entities/parking-lot.entity';
import { VWParkingLot } from './entities/vw-parking-lot.entity';
import { ParkingLotService } from './parking-lot.service';
import { VWParkingLotService } from './vw-parking-lot.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingLot, VWParkingLot])],
  providers: [ParkingLotService, VWParkingLotService],
  exports: [ParkingLotService, VWParkingLotService],
})
export class ParkingLotModule { }
