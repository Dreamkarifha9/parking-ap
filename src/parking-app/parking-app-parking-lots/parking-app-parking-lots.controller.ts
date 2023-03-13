import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ParkingAppParkingLotsService } from './parking-app-parking-lots.service';
import { CreateParkingAppParkingLotDto } from './dto/create-parking-app-parking-lot.dto';
import { UpdateParkingAppParkingLotDto } from './dto/update-parking-app-parking-lot.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseParkingLotDto } from './dto/response-parking-lot.dto';
import { VWParkingSlotsDto } from 'src/slots/dto/vw-parking-slots.dto';
import { SearchVWParkingSlotDto } from 'src/slots/dto/search-vw-parking-slot.dto';
import { SearchParkingLotDto } from 'src/parking-lot/dto/search-parking-lot.dto';
import { ParkingLotsDto } from 'src/parking-lot/dto/parking-lots.dto';

@ApiTags('App::ParkingApp::ParkingLots')
@Controller('parking-app-parking-lots')
export class ParkingAppParkingLotsController {
  constructor(
    private readonly parkingAppParkingLotsService: ParkingAppParkingLotsService,
  ) { }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateParkingAppParkingLotDto })
  @ApiCreatedResponse({
    description: 'ParkingLots has created successfully.',
    type: ResponseParkingLotDto,
  })
  create(@Body() createParkingAppParkingLotDto: CreateParkingAppParkingLotDto) {
    return this.parkingAppParkingLotsService.create(
      createParkingAppParkingLotDto,
    );
  }

  @Get('')
  @ApiOkResponse({
    description: 'A successful response.',
    type: ParkingLotsDto,
  })
  findAll(
    @Query()
    query: SearchParkingLotDto,
  ) {
    query.deleted = query.deleted || false;
    query.size = query.size || 20;
    return this.parkingAppParkingLotsService.findAll(query);
  }

  @Get('details')
  @ApiOkResponse({
    description: 'A successful response.',
    type: VWParkingSlotsDto,
  })
  findDetail(
    @Query()
    query: SearchVWParkingSlotDto,
  ) {
    query.deleted = query.deleted || false;
    query.size = query.size || 20;
    return this.parkingAppParkingLotsService.findDetail(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parkingAppParkingLotsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateParkingAppParkingLotDto: UpdateParkingAppParkingLotDto,
  // ) {
  //   return this.parkingAppParkingLotsService.update(
  //     +id,
  //     updateParkingAppParkingLotDto,
  //   );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parkingAppParkingLotsService.remove(+id);
  // }
}
