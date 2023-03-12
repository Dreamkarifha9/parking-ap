import { OmitType } from '@nestjs/swagger';
import { ParkingSlotReservationDto } from './parking-slot-reservation.dto';

export class CreateParkingSlotReservationDto extends OmitType(
    ParkingSlotReservationDto,
    [
        'id',
        'parkingSlotId',
        'startTimestamp',
        'exitTimestamp',
        'durationInMinutes',
        'active',
        'deleted',
        'createdAt',
        'createdBy',
        'updatedAt',
        'updatedBy',
    ],
) { }
