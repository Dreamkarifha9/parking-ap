import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateSlotDto } from './dto/create-slot.dto';

import { Slot } from './entities/slot.entity';
import { addMilliseconds } from 'date-fns';
@Injectable()
export class SlotsService {
  private readonly logger: Logger = new Logger(SlotsService.name);
  constructor(
    @InjectRepository(Slot)
    private readonly slotsRepository: Repository<Slot>,
  ) { }
  async create(createSlotDto: CreateSlotDto[]) {
    this.logger.debug(
      `createSlotDto ${JSON.stringify(createSlotDto[0].numberOfSlot)}`,
    );

    const { newArray } = await this.genrateSlot(createSlotDto);

    const newSlot = this.slotsRepository.create(newArray);

    const result = await this.slotsRepository.save(newSlot);

    return plainToInstance(CreateSlotDto, result);
  }

  async genrateSlot(slots: CreateSlotDto[]) {
    const newArray = [];
    for (let i = 0; i < slots.length; i++) {
      let maxSlotNumber = 0;
      const lastSlotNumber = await this.getLastSeq(slots[i].floorId);
      this.logger.debug(`lastSlotNumber ${lastSlotNumber}`);
      const numberOfSlot = slots[i].numberOfSlot - lastSlotNumber;
      // createOrUpdate
      if (lastSlotNumber != 0) {
        for (let s = 0; s < numberOfSlot; s++) {
          maxSlotNumber = lastSlotNumber + 1;
          const createdAt = addMilliseconds(new Date(), s);
          this.logger.debug(`maxSlotNumber ${JSON.stringify(maxSlotNumber)}`);
          const mapDto = {
            ...slots[i],
            slotNumber: maxSlotNumber,
            createdAt,
          };
          newArray.push(mapDto);
        }
      } else {
        for (let s = 0; s < numberOfSlot; s++) {
          maxSlotNumber = maxSlotNumber + 1;
          const createdAt = addMilliseconds(new Date(), s);
          this.logger.debug(`maxSlotNumber ${JSON.stringify(maxSlotNumber)}`);
          const mapDto = {
            ...slots[i],
            slotNumber: maxSlotNumber,
            createdAt,
          };
          newArray.push(mapDto);
        }
      }
    }
    return { newArray };
  }

  async getLastSeq(floorId: number) {
    const result = await this.slotsRepository.findOne({
      select: ['slotNumber'],
      where: { floorId, active: true, deleted: false },
      order: { createdAt: 'DESC' },
    });
    if (!result) return 0;
    this.logger.debug('slotNumber', JSON.stringify(result.slotNumber));
    const lastNumber: number = +result.slotNumber;
    return lastNumber;
  }

  findAll() {
    return `This action returns all slots`;
  }

  findOne(id: number) {
    return this.slotsRepository.findOne({ where: { id } });
  }
  async update(slot: Slot, dto: Partial<Slot>) {
    // Reason => https://github.com/typeorm/typeorm/issues/5131#issuecomment-1030895756
    const updateSlot = Object.assign(slot, dto);
    this.logger.debug(`updateSlot ${JSON.stringify(updateSlot)}`);
    return this.slotsRepository.save(updateSlot, { reload: true });
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
