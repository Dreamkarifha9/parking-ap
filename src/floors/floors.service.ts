import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateFloorDto } from './dto/create-floor.dto';

import { UpdateFloorDto } from './dto/update-floor.dto';
import { Floor } from './entities/floor.entity';

@Injectable()
export class FloorsService {
  private readonly logger: Logger = new Logger(FloorsService.name);
  constructor(
    @InjectRepository(Floor)
    private readonly floorsRepository: Repository<Floor>,
  ) { }
  async create(createFloorDto: CreateFloorDto[]) {
    const isFloor = this.hasDuplicates(
      createFloorDto,
      'blockId',
      'floorNumber',
    );
    if (isFloor)
      throw new HttpException(
        'blockId and floorNumber in array duplicate',
        HttpStatus.BAD_REQUEST,
      );

    const newArray = [];
    for (let i = 0; i < createFloorDto.length; i++) {
      await this.checkDuplicateFloor(
        createFloorDto[i].blockId,
        createFloorDto[i].floorNumber,
      );
      const mapDto = {
        blockId: createFloorDto[i].blockId,
        floorNumber: createFloorDto[i].floorNumber,
        numberOfSlot: createFloorDto[i].numberOfSlot,
        isFloorFull: createFloorDto[i].isFloorFull,
        createdAt: new Date(),
      };
      newArray.push(mapDto);
    }
    const newFloors = this.floorsRepository.create(newArray);
    this.logger.debug(`newFloors ${JSON.stringify(newFloors)}`);
    const result = await this.floorsRepository.save(newFloors);

    return plainToInstance(CreateFloorDto, result);
  }

  async checkDuplicateFloor(blockId: number, floorNumber: number) {
    const foundFloor = await this.floorsRepository.findOneBy({
      blockId,
      floorNumber,
      active: true,
      deleted: false,
    });
    this.logger.debug(`foundFloor ${JSON.stringify(foundFloor)}`);
    if (foundFloor)
      throw new HttpException(
        `blockId ${blockId} and floorNumber ${floorNumber} has been used.`,
        HttpStatus.CONFLICT,
      );
    return foundFloor;
  }

  hasDuplicates(array: any, propertyOne: string, propertyTwo: string) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (
          array[i][propertyOne] === array[j][propertyOne] &&
          array[i][propertyTwo] === array[j][propertyTwo]
        ) {
          return true; // duplicate found
        }
      }
    }
    return false; // no duplicates found
  }

  findAll() {
    return `This action returns all floors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} floor`;
  }

  update(id: number, updateFloorDto: UpdateFloorDto) {
    return `This action updates a #${id} floor`;
  }

  remove(id: number) {
    return `This action removes a #${id} floor`;
  }
}
