import { PartialType } from '@nestjs/swagger';
import { CreateParkingAppSlotDto } from './create-parking-app-slot.dto';

export class UpdateParkingAppSlotDto extends PartialType(
    CreateParkingAppSlotDto,
) { }
