import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlocksService } from './blocks.service';
import { Blocks } from './entities/block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blocks])],
  providers: [BlocksService],
  exports: [BlocksService],
})
export class BlocksModule { }
