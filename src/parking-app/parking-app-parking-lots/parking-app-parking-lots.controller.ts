import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ParkingAppParkingLotsService } from './parking-app-parking-lots.service';
import { CreateParkingAppParkingLotDto } from './dto/create-parking-app-parking-lot.dto';
import { UpdateParkingAppParkingLotDto } from './dto/update-parking-app-parking-lot.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

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
  })
  create(@Body() createParkingAppParkingLotDto: CreateParkingAppParkingLotDto) {
    return this.parkingAppParkingLotsService.create(
      createParkingAppParkingLotDto,
    );
  }

  @Get()
  findAll() {
    return this.parkingAppParkingLotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingAppParkingLotsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParkingAppParkingLotDto: UpdateParkingAppParkingLotDto,
  ) {
    return this.parkingAppParkingLotsService.update(
      +id,
      updateParkingAppParkingLotDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingAppParkingLotsService.remove(+id);
  }
}
