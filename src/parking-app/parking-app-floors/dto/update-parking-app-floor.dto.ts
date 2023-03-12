import { PartialType } from '@nestjs/swagger';
import { CreateParkingAppFloorDto } from './create-parking-app-floor.dto';

export class UpdateParkingAppFloorDto extends PartialType(CreateParkingAppFloorDto) {}
