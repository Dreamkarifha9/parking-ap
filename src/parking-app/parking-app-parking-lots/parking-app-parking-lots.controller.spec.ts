import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppParkingLotsController } from './parking-app-parking-lots.controller';
import { ParkingAppParkingLotsService } from './parking-app-parking-lots.service';

describe('ParkingAppParkingLotsController', () => {
  let controller: ParkingAppParkingLotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingAppParkingLotsController],
      providers: [ParkingAppParkingLotsService],
    }).compile();

    controller = module.get<ParkingAppParkingLotsController>(ParkingAppParkingLotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
