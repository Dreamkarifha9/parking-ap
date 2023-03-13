import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from './entities/floor.entity';
import { VWFloor } from './entities/vw-floor.entity';
import { FloorsService } from './floors.service';
import { VWFloorService } from './vw-floors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Floor, VWFloor])],
  providers: [FloorsService, VWFloorService],
  exports: [FloorsService, VWFloorService],
})
export class FloorsModule { }
