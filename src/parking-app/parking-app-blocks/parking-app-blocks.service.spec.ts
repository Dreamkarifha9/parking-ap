import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppBlocksService } from './parking-app-blocks.service';

describe('ParkingAppBlocksService', () => {
  let service: ParkingAppBlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingAppBlocksService],
    }).compile();

    service = module.get<ParkingAppBlocksService>(ParkingAppBlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
