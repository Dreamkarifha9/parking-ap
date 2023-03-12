import { PartialType } from '@nestjs/swagger';
import { CreateParkingAppParkingLotDto } from './create-parking-app-parking-lot.dto';

export class UpdateParkingAppParkingLotDto extends PartialType(
    CreateParkingAppParkingLotDto,
) { }
