import { forwardRef, Module } from '@nestjs/common';
import { ParkingAppFloorsService } from './parking-app-floors.service';
import { ParkingAppFloorsController } from './parking-app-floors.controller';
import { FloorsModule } from 'src/floors/floors.module';

@Module({
  imports: [forwardRef(() => FloorsModule)],
  controllers: [ParkingAppFloorsController],
  providers: [ParkingAppFloorsService],
})
export class ParkingAppFloorsModule { }
