import { PartialType } from '@nestjs/swagger';
import { CreateParkingAppBlockDto } from './create-parking-app-block.dto';

export class UpdateParkingAppBlockDto extends PartialType(CreateParkingAppBlockDto) {}
