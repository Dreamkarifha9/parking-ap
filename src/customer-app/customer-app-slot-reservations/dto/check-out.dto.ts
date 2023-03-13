import { PickType } from '@nestjs/swagger';
import { ParkingSlotReservationDto } from 'src/parking-slot-reservation/dto/parking-slot-reservation.dto';

export class CheckOutDto extends PickType(ParkingSlotReservationDto, [
    'numberPlate',
]) { }
