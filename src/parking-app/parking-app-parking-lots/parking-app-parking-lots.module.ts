import { forwardRef, Module } from '@nestjs/common';
import { ParkingAppParkingLotsService } from './parking-app-parking-lots.service';
import { ParkingAppParkingLotsController } from './parking-app-parking-lots.controller';
import { ParkingLotModule } from 'src/parking-lot/parking-lot.module';

@Module({
  imports: [forwardRef(() => ParkingLotModule)],
  controllers: [ParkingAppParkingLotsController],
  providers: [ParkingAppParkingLotsService],
})
export class ParkingAppParkingLotsModule { }
