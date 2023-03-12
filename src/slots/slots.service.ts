import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { Slot } from './entities/slot.entity';

@Injectable()
export class SlotsService {
  private readonly logger: Logger = new Logger(SlotsService.name);
  constructor(
    @InjectRepository(Slot)
    private readonly slotsRepository: Repository<Slot>,
  ) { }
  create(createSlotDto: CreateSlotDto) {
    return 'This action adds a new slot';
  }

  findAll() {
    return `This action returns all slots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slot`;
  }

  update(id: number, updateSlotDto: UpdateSlotDto) {
    return `This action updates a #${id} slot`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
