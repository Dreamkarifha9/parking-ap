import { PartialType } from '@nestjs/swagger';
import { CreateFloorsDto } from './create-floor.dto';

export class UpdateFloorDto extends PartialType(CreateFloorsDto) {
    id: number;
}
