import { ApiProperty, OmitType } from '@nestjs/swagger';
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
    blocks: CreateBlockDto[];
}
