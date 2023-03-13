import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { ParkingAppBlocksService } from './parking-app-blocks.service';
import { CreateParkingAppBlockDto } from './dto/create-parking-app-block.dto';
import { UpdateParkingAppBlockDto } from './dto/update-parking-app-block.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseBlockDto } from './dto/response-parking-lot.dto';

@ApiTags('App::ParkingApp::Blocks')
@Controller('parking-app-blocks')
export class ParkingAppBlocksController {
  private readonly logger: Logger = new Logger(ParkingAppBlocksController.name);
  constructor(
    private readonly parkingAppBlocksService: ParkingAppBlocksService,
  ) { }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateParkingAppBlockDto })
  @ApiCreatedResponse({
    description: 'Block has created successfully.',
    type: ResponseBlockDto,
  })
  create(@Body() createParkingAppBlockDto: CreateParkingAppBlockDto) {
    this.logger.debug(
      `createParkingAppBlockDto ${JSON.stringify(
        createParkingAppBlockDto.blocks,
      )}`,
    );
    return this.parkingAppBlocksService.create(createParkingAppBlockDto);
  }
  // @Get()
  // findAll() {
  //   return this.parkingAppBlocksService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parkingAppBlocksService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateParkingAppBlockDto: UpdateParkingAppBlockDto,
  // ) {
  //   return this.parkingAppBlocksService.update(+id, updateParkingAppBlockDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parkingAppBlocksService.remove(+id);
  // }
}
