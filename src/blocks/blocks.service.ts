import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ILike, Repository } from 'typeorm';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block } from './entities/block.entity';

@Injectable()
export class BlocksService {
  private readonly logger: Logger = new Logger(BlocksService.name);
  constructor(
    @InjectRepository(Block)
    private readonly blocksRepository: Repository<Block>,
  ) { }
  async create(createBlockDto: CreateBlockDto[]) {
    this.logger.debug(`createBlockDto ${createBlockDto[0].blockSize}`);
    const isBlockCode = this.hasDuplicates(createBlockDto, 'blockCode');
    if (isBlockCode)
      throw new HttpException(
        'blockCode in array duplicate',
        HttpStatus.BAD_REQUEST,
      );

    const newArray = [];
    for (let i = 0; i < createBlockDto.length; i++) {
      await this.checkDuplicateBlock(createBlockDto[i].blockCode);
      const mapDto = {
        parkingLotId: createBlockDto[i].parkingLotId,
        blockCode: createBlockDto[i].blockCode,
        blockSize: createBlockDto[i].blockSize,
        isBlockFull: createBlockDto[i].isBlockFull,
        createdAt: new Date(),
      };
      newArray.push(mapDto);
    }
    const newBlocks = this.blocksRepository.create(newArray);
    this.logger.debug(`newBlocks ${JSON.stringify(newBlocks)}`);
    const result = await this.blocksRepository.save(newBlocks);

    return plainToInstance(CreateBlockDto, result);
  }

  async checkDuplicateBlock(blockCode: string) {
    const foundBlock = await this.blocksRepository.findOneBy({
      blockCode: ILike(blockCode),
      active: true,
      deleted: false,
    });
    this.logger.debug(`foundBlock ${JSON.stringify(foundBlock)}`);
    if (foundBlock)
      throw new HttpException(
        `block code ${blockCode} has been used.`,
        HttpStatus.CONFLICT,
      );
    return foundBlock;
  }

  hasDuplicates(array, property) {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i][property] === array[j][property]) {
          return true; // duplicate found
        }
      }
    }
    return false; // no duplicates found
  }

  findAll() {
    return `This action returns all blocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} block`;
  }

  update(id: number, updateBlockDto: UpdateBlockDto) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}
