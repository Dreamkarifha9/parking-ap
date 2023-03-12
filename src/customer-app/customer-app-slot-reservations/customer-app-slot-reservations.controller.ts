import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerAppSlotReservationsService } from './customer-app-slot-reservations.service';
import { CreateCustomerAppSlotReservationDto } from './dto/create-customer-app-slot-reservation.dto';
import { UpdateCustomerAppSlotReservationDto } from './dto/update-customer-app-slot-reservation.dto';

@ApiTags('App::CustomerApp::slot-reservations')
@Controller('customer-app-reservations')
export class CustomerAppSlotReservationsController {
  constructor(
    private readonly customerAppSlotReservationsService: CustomerAppSlotReservationsService,
  ) { }

  @Post('check-in')
  checkIn(
    @Body()
    createCustomerAppSlotReservationDto: CreateCustomerAppSlotReservationDto,
  ) {
    return this.customerAppSlotReservationsService.create(
      createCustomerAppSlotReservationDto,
    );
  }

  @Post('check-out')
  checkOut(
    @Body()
    createCustomerAppSlotReservationDto: CreateCustomerAppSlotReservationDto,
  ) {
    return this.customerAppSlotReservationsService.create(
      createCustomerAppSlotReservationDto,
    );
  }
}
