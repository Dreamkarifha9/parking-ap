import { Injectable, Logger } from '@nestjs/common';
import { ParkingLotService } from 'src/parking-lot/parking-lot.service';
import { CreateParkingAppParkingLotDto } from './dto/create-parking-app-parking-lot.dto';
import { UpdateParkingAppParkingLotDto } from './dto/update-parking-app-parking-lot.dto';

@Injectable()
export class ParkingAppParkingLotsService {
  private readonly logger: Logger = new Logger(
    ParkingAppParkingLotsService.name,
  );
  constructor(private readonly parkingLotService: ParkingLotService) { }
  create(createParkingAppParkingLotDto: CreateParkingAppParkingLotDto) {
    return this.parkingLotService.create(createParkingAppParkingLotDto);
  }

  findAll() {
    return `This action returns all parkingAppParkingLots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingAppParkingLot`;
  }

  update(
    id: number,
    updateParkingAppParkingLotDto: UpdateParkingAppParkingLotDto,
  ) {
    return `This action updates a #${id} parkingAppParkingLot`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingAppParkingLot`;
  }
}
