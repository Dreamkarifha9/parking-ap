import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { UpdateParkingLotDto } from './dto/update-parking-lot.dto';
import { ParkingLot } from './entities/parking-lot.entity';

@Injectable()
export class ParkingLotService {
  private readonly logger: Logger = new Logger(ParkingLotService.name);
  constructor(
    @InjectRepository(ParkingLot)
    private readonly parkingLotRepository: Repository<ParkingLot>,
  ) { }
  async create(createParkingLotDto: CreateParkingLotDto) {
    const parkingLot: ParkingLot = {
      id: null,
      ...createParkingLotDto,
      createdAt: new Date(),
      createdBy: 'system'
    };
    const nweParkingLot = this.parkingLotRepository.create(parkingLot);
    await this.parkingLotRepository.save(nweParkingLot);
    return nweParkingLot;
  }

  findAll() {
    return `This action returns all parkingLot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingLot`;
  }

  update(id: number, updateParkingLotDto: UpdateParkingLotDto) {
    return `This action updates a #${id} parkingLot`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingLot`;
  }
}
