import { OmitType } from '@nestjs/swagger';
import { ParkingLotDto } from './parking-lot.dto';

export class CreateParkingLotDto extends OmitType(ParkingLotDto, [
    'id',
    'active',
    'deleted',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
]) { }
