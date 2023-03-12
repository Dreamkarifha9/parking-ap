import { ApiProperty, OmitType } from '@nestjs/swagger';
import { FloorDto } from './floor.dto';

export class CreateFloorDto extends OmitType(FloorDto, [
    'id',
    'active',
    'deleted',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
]) { }

export class CreateFloorsDto {
    @ApiProperty({ type: CreateFloorDto, isArray: true })
    floors: CreateFloorDto[];
}
