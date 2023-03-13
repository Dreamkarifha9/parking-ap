import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
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
  @ValidateNested({ each: true })
  @Type(() => CreateFloorDto)
  floors: CreateFloorDto[];
}
