import { forwardRef, Module } from '@nestjs/common';
import { ParkingAppSlotsService } from './parking-app-slots.service';
import { ParkingAppSlotsController } from './parking-app-slots.controller';
import { SlotsModule } from 'src/slots/slots.module';

@Module({
  imports: [forwardRef(() => SlotsModule)],
  controllers: [ParkingAppSlotsController],
  providers: [ParkingAppSlotsService],
})
export class ParkingAppSlotsModule { }
