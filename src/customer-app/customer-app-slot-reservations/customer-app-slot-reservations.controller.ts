import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerAppSlotReservationsService } from './customer-app-slot-reservations.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@ApiTags('App::CustomerApp::SlotReservations')
@Controller('customer-app-reservations')
export class CustomerAppSlotReservationsController {
  constructor(
    private readonly customerAppSlotReservationsService: CustomerAppSlotReservationsService,
  ) { }

  @Post('check-in')
  checkIn(
    @Body()
    checkInDto: CheckInDto,
  ) {
    return this.customerAppSlotReservationsService.checkIn(checkInDto);
  }

  @Post('check-out')
  checkOut(
    @Body()
    checkOutDto: CheckOutDto,
  ) {
    return this.customerAppSlotReservationsService.checkOut(checkOutDto);
  }
}
