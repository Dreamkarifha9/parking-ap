import { ApiProperty, OmitType } from '@nestjs/swagger';
import { FloorDto } from './floor.dto';

export class UpdateFloorDto extends OmitType(FloorDto, [
    'active',
    'deleted',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
]) { }

export class UpdateFloorsDto {
    @ApiProperty({ type: UpdateFloorDto, isArray: true })
    floors: UpdateFloorDto[];
}
