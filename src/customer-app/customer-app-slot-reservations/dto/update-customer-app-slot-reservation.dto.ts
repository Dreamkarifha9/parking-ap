import { PartialType } from '@nestjs/swagger';
import { CreateCustomerAppSlotReservationDto } from './create-customer-app-slot-reservation.dto';

export class UpdateCustomerAppSlotReservationDto extends PartialType(CreateCustomerAppSlotReservationDto) {}
