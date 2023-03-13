import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BlockDto } from './block.dto';

export class CreateBlockDto extends OmitType(BlockDto, [
    'id',
    'active',
    'deleted',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
]) { }

export class CreateBlocksDto {
    @ApiProperty({ type: CreateBlockDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateBlockDto)
    blocks: CreateBlockDto[];
}
