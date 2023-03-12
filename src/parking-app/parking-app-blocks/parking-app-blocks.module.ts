import { forwardRef, Module } from '@nestjs/common';
import { ParkingAppBlocksService } from './parking-app-blocks.service';
import { ParkingAppBlocksController } from './parking-app-blocks.controller';
import { BlocksModule } from 'src/blocks/blocks.module';

@Module({
  imports: [forwardRef(() => BlocksModule)],
  controllers: [ParkingAppBlocksController],
  providers: [ParkingAppBlocksService],
})
export class ParkingAppBlocksModule { }
