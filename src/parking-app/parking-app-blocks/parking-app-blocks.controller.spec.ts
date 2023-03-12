import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppBlocksController } from './parking-app-blocks.controller';
import { ParkingAppBlocksService } from './parking-app-blocks.service';

describe('ParkingAppBlocksController', () => {
  let controller: ParkingAppBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingAppBlocksController],
      providers: [ParkingAppBlocksService],
    }).compile();

    controller = module.get<ParkingAppBlocksController>(ParkingAppBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
