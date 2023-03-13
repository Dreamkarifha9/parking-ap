import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParkingSlotReservationsDto } from 'src/parking-slot-reservation/dto/parking-slot-reservations.dto';
import { SearchParkingSlotReservationDto } from 'src/parking-slot-reservation/dto/search-parking-slot-reservation.dto';
import { ParkingAppParkingSlotReservationsService } from './parking-app-parking-slot-reservations.service';

@ApiTags('App::ParkingApp::ParkingSlotReservations')
@Controller('parking-app-parking-slot-reservations')
export class ParkingAppParkingSlotReservationsController {
  constructor(
    private readonly parkingAppParkingSlotReservationsService: ParkingAppParkingSlotReservationsService,
  ) { }

  @Get()
  @ApiOkResponse({
    description: 'A successful response.',
    type: ParkingSlotReservationsDto,
  })
  findAll(
    @Query()
    query: SearchParkingSlotReservationDto,
  ) {
    query.deleted = query.deleted || false;
    query.size = query.size || 20;
    return this.parkingAppParkingSlotReservationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingAppParkingSlotReservationsService.findOne(+id);
  }
}
