import { Injectable, Logger } from '@nestjs/common';
import { SearchParkingLotDto } from 'src/parking-lot/dto/search-parking-lot.dto';
import { ParkingLotService } from 'src/parking-lot/parking-lot.service';
import { SearchVWParkingSlotDto } from 'src/slots/dto/search-vw-parking-slot.dto';
import { VWParkingSlotsService } from 'src/slots/vw-parking-slots.service';
import { CreateParkingAppParkingLotDto } from './dto/create-parking-app-parking-lot.dto';
import { UpdateParkingAppParkingLotDto } from './dto/update-parking-app-parking-lot.dto';

@Injectable()
export class ParkingAppParkingLotsService {
  private readonly logger: Logger = new Logger(
    ParkingAppParkingLotsService.name,
  );
  constructor(
    private readonly parkingLotService: ParkingLotService,
    private readonly vWParkingSlotsService: VWParkingSlotsService,
  ) { }
  create(createParkingAppParkingLotDto: CreateParkingAppParkingLotDto) {
    return this.parkingLotService.create(createParkingAppParkingLotDto);
  }

  findAll(query: SearchParkingLotDto) {
    return this.parkingLotService.findAll(query);
  }

  findDetail(query: SearchVWParkingSlotDto) {
    return this.vWParkingSlotsService.findAll(query);
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
