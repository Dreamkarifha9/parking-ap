import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { Repository } from 'typeorm';
import { VWFloorDto } from './dto/vw-floor.dto';
import { VWFloor } from './entities/vw-floor.entity';

@Injectable()
export class VWFloorService {
  private readonly logger: Logger = new Logger(VWFloorService.name);
  constructor(
    @InjectRepository(VWFloor)
    private readonly vWParkingLotsRepository: Repository<VWFloor>,
  ) { }

  async findSummary(): Promise<VWFloorDto[]> {
    const result = await this.vWParkingLotsRepository.find();
    const newArray = result.map((plainObject) =>
      plainToClass(VWFloorDto, plainObject),
    );

    return newArray;
  }

  async findOneBySearch(q: Partial<VWFloorDto>) {
    return this.vWParkingLotsRepository.findOneBy({ ...q });
  }
}
