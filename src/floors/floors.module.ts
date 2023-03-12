import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from './entities/floor.entity';
import { FloorsService } from './floors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Floor])],
  providers: [FloorsService],
  exports: [FloorsService],
})
export class FloorsModule { }
