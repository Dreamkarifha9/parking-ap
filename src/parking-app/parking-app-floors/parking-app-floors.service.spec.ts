import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppFloorsService } from './parking-app-floors.service';

describe('ParkingAppFloorsService', () => {
  let service: ParkingAppFloorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingAppFloorsService],
    }).compile();

    service = module.get<ParkingAppFloorsService>(ParkingAppFloorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
