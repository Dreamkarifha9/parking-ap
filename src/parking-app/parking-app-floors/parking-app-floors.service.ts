import { Injectable, Logger } from '@nestjs/common';
import { FloorsService } from 'src/floors/floors.service';
import { CreateParkingAppFloorDto } from './dto/create-parking-app-floor.dto';

import { UpdateParkingAppFloorDto } from './dto/update-parking-app-floor.dto';

@Injectable()
export class ParkingAppFloorsService {
  private readonly logger: Logger = new Logger(ParkingAppFloorsService.name);
  constructor(private readonly floorsService: FloorsService) { }
  create(createParkingAppFloorDto: CreateParkingAppFloorDto) {
    this.logger.debug(
      `createParkingAppFloorDto ${JSON.stringify(createParkingAppFloorDto)}`,
    );
    return this.floorsService.create(createParkingAppFloorDto.floors);
  }
  findAll() {
    return `This action returns all parkingAppFloors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingAppFloor`;
  }

  update(id: number, updateParkingAppFloorDto: UpdateParkingAppFloorDto) {
    return `This action updates a #${id} parkingAppFloor`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingAppFloor`;
  }
}
