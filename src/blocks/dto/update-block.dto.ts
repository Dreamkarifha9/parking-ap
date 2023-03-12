import { PartialType } from '@nestjs/swagger';
import { CreateBlocksDto } from './create-block.dto';

export class UpdateBlockDto extends PartialType(CreateBlocksDto) {
    id: number;
}
