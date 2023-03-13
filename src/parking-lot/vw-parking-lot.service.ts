import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';

import { Repository } from 'typeorm';
import { VWParkingLotDto } from './dto/vw-parking-lot.dto';
import { VWParkingLot } from './entities/vw-parking-lot.entity';

@Injectable()
export class VWParkingLotService {
    private readonly logger: Logger = new Logger(VWParkingLotService.name);
    constructor(
        @InjectRepository(VWParkingLot)
        private readonly vWParkingLotsRepository: Repository<VWParkingLot>,
    ) { }

    async findSummary(): Promise<VWParkingLotDto[]> {
        const result = await this.vWParkingLotsRepository.find();
        const userArray = result.map((plainObject) =>
            plainToClass(VWParkingLotDto, plainObject),
        );

        return userArray;
    }

    async findOneBySearch(q: Partial<VWParkingLotDto>) {
        return this.vWParkingLotsRepository.findOneBy({ ...q });
    }
}
