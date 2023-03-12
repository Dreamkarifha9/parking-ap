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
import { ParkingAppSlotsService } from './parking-app-slots.service';
import { CreateParkingAppSlotDto } from './dto/create-parking-app-slot.dto';
import { UpdateParkingAppSlotDto } from './dto/update-parking-app-slot.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseSlotDto } from './dto/response-parking-lot.dto';

@ApiTags('App::ParkingApp::slots')
@Controller('parking-app-slots')
export class ParkingAppSlotsController {
  private readonly logger: Logger = new Logger(ParkingAppSlotsController.name);
  constructor(
    private readonly parkingAppSlotsService: ParkingAppSlotsService,
  ) { }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateParkingAppSlotDto })
  @ApiCreatedResponse({
    description: 'Slot has created successfully.',
    type: ResponseSlotDto,
  })
  create(@Body() createParkingAppSlotDto: CreateParkingAppSlotDto) {
    return this.parkingAppSlotsService.create(createParkingAppSlotDto);
  }

  // @Get()
  // findAll() {
  //   return this.parkingAppSlotsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parkingAppSlotsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateParkingAppSlotDto: UpdateParkingAppSlotDto,
  // ) {
  //   return this.parkingAppSlotsService.update(+id, updateParkingAppSlotDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parkingAppSlotsService.remove(+id);
  // }
}
