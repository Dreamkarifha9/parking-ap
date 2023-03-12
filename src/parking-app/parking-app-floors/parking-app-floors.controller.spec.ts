import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppFloorsController } from './parking-app-floors.controller';
import { ParkingAppFloorsService } from './parking-app-floors.service';

describe('ParkingAppFloorsController', () => {
  let controller: ParkingAppFloorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingAppFloorsController],
      providers: [ParkingAppFloorsService],
    }).compile();

    controller = module.get<ParkingAppFloorsController>(ParkingAppFloorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
