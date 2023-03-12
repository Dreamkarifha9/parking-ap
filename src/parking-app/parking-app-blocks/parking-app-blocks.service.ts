import { Injectable, Logger } from '@nestjs/common';
import { BlocksService } from 'src/blocks/blocks.service';

import { CreateParkingAppBlockDto } from './dto/create-parking-app-block.dto';

import { UpdateParkingAppBlockDto } from './dto/update-parking-app-block.dto';

@Injectable()
export class ParkingAppBlocksService {
  private readonly logger: Logger = new Logger(ParkingAppBlocksService.name);
  constructor(private readonly blocksService: BlocksService) { }
  create(createParkingAppBlockDto: CreateParkingAppBlockDto) {
    this.logger.debug(
      `createParkingAppBlockDto ${JSON.stringify(createParkingAppBlockDto)}`,
    );
    return this.blocksService.create(createParkingAppBlockDto.blocks);
  }

  findAll() {
    return `This action returns all parkingAppBlocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parkingAppBlock`;
  }

  update(id: number, updateParkingAppBlockDto: UpdateParkingAppBlockDto) {
    return `This action updates a #${id} parkingAppBlock`;
  }

  remove(id: number) {
    return `This action removes a #${id} parkingAppBlock`;
  }
}
