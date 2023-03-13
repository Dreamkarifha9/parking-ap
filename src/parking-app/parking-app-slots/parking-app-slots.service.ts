import { Injectable, Logger } from '@nestjs/common';
import { SlotsService } from 'src/slots/slots.service';
import { CreateParkingAppSlotDto } from './dto/create-parking-app-slot.dto';
import { UpdateParkingAppSlotDto } from './dto/update-parking-app-slot.dto';

@Injectable()
export class ParkingAppSlotsService {
  private readonly logger: Logger = new Logger(ParkingAppSlotsService.name);
  constructor(private readonly slotsService: SlotsService) { }
  create(createParkingAppSlotDto: CreateParkingAppSlotDto) {
    return this.slotsService.create(createParkingAppSlotDto.slots);
  }

  findAll() {
    return `This action returns all parkingAppSlots`;
  }

  findOne(id: number) {
    return this.slotsService.findOne(id);
  }

  update(id: number, updateParkingAppSlotDto: UpdateParkingAppSlotDto) {
    return `This action updates a #${id} parkingAppSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingAppSlot`;
  }
}
