import { PartialType } from '@nestjs/swagger';
import { CreateParkingSlotReservationDto } from './create-parking-slot-reservation.dto';

export class UpdateParkingSlotReservationDto extends PartialType(
    CreateParkingSlotReservationDto,
) { }
