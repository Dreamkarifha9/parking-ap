import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ILike, Repository } from 'typeorm';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { ParkingLotDto } from './dto/parking-lot.dto';
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
      createdBy: 'system',
    };
    await this.checkDuplicateParkingLot(parkingLot.name);
    const nweParkingLot = this.parkingLotRepository.create(parkingLot);
    this.logger.debug(`nweParkingLot ${JSON.stringify(nweParkingLot.id)}`);
    const result = await this.parkingLotRepository.save(nweParkingLot);
    this.logger.debug(`result ${JSON.stringify(result)}`);

    return plainToInstance(ParkingLotDto, result);
  }

  async checkDuplicateParkingLot(name: string) {
    const foundParkingLot = await this.parkingLotRepository.findOneBy({
      name: ILike(name),
      active: true,
      deleted: false,
    });
    this.logger.debug(`foundParkingLot ${JSON.stringify(foundParkingLot)}`);
    if (foundParkingLot)
      throw new HttpException(
        `parkingLot name ${name} has been used.`,
        HttpStatus.CONFLICT,
      );
    return foundParkingLot;
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
