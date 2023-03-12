import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { BaseDataDto } from 'src/shared/dtos';
import { ECarSize } from 'src/shared/enums';

export class BlockDto extends BaseDataDto {
    @ApiProperty({ default: null })
    @IsNumber()
    @Type(() => Number)
    id: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    parkingLotId: number;

    @ApiProperty()
    @IsString()
    @Type(() => String)
    blockCode: string;

    @ApiProperty({
        type: String,
        enum: ECarSize,
    })
    @IsEnum(ECarSize, { each: true })
    blockSize: ECarSize;

    @ApiProperty({ default: false })
    @IsBoolean()
    @Type(() => Boolean)
    isBlockFull: boolean;
}
