import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlocksService } from './blocks.service';
import { Block } from './entities/block.entity';
import { VWParkingBlock } from './entities/vw-parking-block.entity';
import { VWParkingBlocks } from './vw-parking-block.service';

@Module({
  imports: [TypeOrmModule.forFeature([Block, VWParkingBlock])],
  providers: [BlocksService, VWParkingBlocks],
  exports: [BlocksService, VWParkingBlocks],
})
export class BlocksModule { }
