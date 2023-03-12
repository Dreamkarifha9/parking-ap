import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppSlotsService } from './parking-app-slots.service';

describe('ParkingAppSlotsService', () => {
  let service: ParkingAppSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingAppSlotsService],
    }).compile();

    service = module.get<ParkingAppSlotsService>(ParkingAppSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
