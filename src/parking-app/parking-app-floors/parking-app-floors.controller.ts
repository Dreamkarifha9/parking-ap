import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  HttpCode,
} from '@nestjs/common';
import { ParkingAppFloorsService } from './parking-app-floors.service';
import { CreateParkingAppFloorDto } from './dto/create-parking-app-floor.dto';
import { UpdateParkingAppFloorDto } from './dto/update-parking-app-floor.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseFloorDto } from './dto/response-parking-lot.dto';

@ApiTags('App::ParkingApp::floors')
@Controller('parking-app-floors')
export class ParkingAppFloorsController {
  private readonly logger: Logger = new Logger(ParkingAppFloorsController.name);
  constructor(
    private readonly parkingAppFloorsService: ParkingAppFloorsService,
  ) { }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateParkingAppFloorDto })
  @ApiCreatedResponse({
    description: 'Floor has created successfully.',
    type: ResponseFloorDto,
  })
  create(@Body() createParkingAppFloorDto: CreateParkingAppFloorDto) {
    this.logger.debug(
      `createParkingAppFloorDto ${JSON.stringify(
        createParkingAppFloorDto.floors,
      )}`,
    );
    return this.parkingAppFloorsService.create(createParkingAppFloorDto);
  }

  // @Get()
  // findAll() {
  //   return this.parkingAppFloorsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parkingAppFloorsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateParkingAppFloorDto: UpdateParkingAppFloorDto,
  // ) {
  //   return this.parkingAppFloorsService.update(+id, updateParkingAppFloorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parkingAppFloorsService.remove(+id);
  // }
}
