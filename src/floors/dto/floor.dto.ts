import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, Min } from 'class-validator';
import { BaseDataDto } from 'src/shared/dtos';

export class FloorDto extends BaseDataDto {
  @ApiProperty({ default: null })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  blockId: number;

  @ApiProperty()
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  floorNumber: number;

  @ApiProperty()
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  numberOfSlot: number;
}
