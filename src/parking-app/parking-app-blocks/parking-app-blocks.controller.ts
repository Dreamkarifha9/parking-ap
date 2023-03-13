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
  Query,
} from '@nestjs/common';
import { ParkingAppBlocksService } from './parking-app-blocks.service';
import { CreateParkingAppBlockDto } from './dto/create-parking-app-block.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseBlockDto } from './dto/response-parking-lot.dto';
import { SearchVWParkingBlockDto } from 'src/blocks/dto/search-vw-parking-block.dto';
import { VWParkingBlocksDto } from 'src/blocks/dto/vw-parking-blocks.dto';
import { SearchBlockDto } from 'src/blocks/dto/search-block.dto';

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

  @Get()
  @ApiOkResponse({
    description: 'A successful response.',
    type: VWParkingBlocksDto,
  })
  findAll(
    @Query()
    query: SearchBlockDto,
  ) {
    query.deleted = query.deleted || false;
    query.size = query.size || 20;
    return this.parkingAppBlocksService.findAll(query);
  }

  @Get('summary')
  @ApiOkResponse({
    description: 'A successful response.',
    type: VWParkingBlocksDto,
  })
  findSummary(
    @Query()
    query: SearchVWParkingBlockDto,
  ) {
    query.deleted = query.deleted || false;
    query.size = query.size || 20;
    return this.parkingAppBlocksService.findSummary(query);
  }

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
