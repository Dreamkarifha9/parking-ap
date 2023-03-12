import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppSlotsController } from './parking-app-slots.controller';
import { ParkingAppSlotsService } from './parking-app-slots.service';

describe('ParkingAppSlotsController', () => {
  let controller: ParkingAppSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingAppSlotsController],
      providers: [ParkingAppSlotsService],
    }).compile();

    controller = module.get<ParkingAppSlotsController>(ParkingAppSlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
