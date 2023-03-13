import { Injectable, Logger } from '@nestjs/common';
import { BlocksService } from 'src/blocks/blocks.service';
import { SearchBlockDto } from 'src/blocks/dto/search-block.dto';
import { SearchVWParkingBlockDto } from 'src/blocks/dto/search-vw-parking-block.dto';
import { VWParkingBlocks } from 'src/blocks/vw-parking-block.service';

import { CreateParkingAppBlockDto } from './dto/create-parking-app-block.dto';

import { UpdateParkingAppBlockDto } from './dto/update-parking-app-block.dto';

@Injectable()
export class ParkingAppBlocksService {
  private readonly logger: Logger = new Logger(ParkingAppBlocksService.name);
  constructor(
    private readonly blocksService: BlocksService,
    private readonly vWParkingBlocks: VWParkingBlocks,
  ) { }
  create(createParkingAppBlockDto: CreateParkingAppBlockDto) {
    this.logger.debug(
      `createParkingAppBlockDto ${JSON.stringify(createParkingAppBlockDto)}`,
    );
    return this.blocksService.create(createParkingAppBlockDto.blocks);
  }
  findSummary(query: SearchVWParkingBlockDto) {
    return this.vWParkingBlocks.findAll(query);
  }

  findAll(query: SearchBlockDto) {
    return this.blocksService.findAll(query);
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
