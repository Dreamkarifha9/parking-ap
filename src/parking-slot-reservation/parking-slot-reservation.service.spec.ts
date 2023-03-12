import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSlotReservationService } from './parking-slot-reservation.service';

describe('ParkingSlotReservationService', () => {
  let service: ParkingSlotReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingSlotReservationService],
    }).compile();

    service = module.get<ParkingSlotReservationService>(ParkingSlotReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
