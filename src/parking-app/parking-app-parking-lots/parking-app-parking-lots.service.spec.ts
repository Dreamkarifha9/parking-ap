import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppParkingLotsService } from './parking-app-parking-lots.service';

describe('ParkingAppParkingLotsService', () => {
  let service: ParkingAppParkingLotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingAppParkingLotsService],
    }).compile();

    service = module.get<ParkingAppParkingLotsService>(ParkingAppParkingLotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
