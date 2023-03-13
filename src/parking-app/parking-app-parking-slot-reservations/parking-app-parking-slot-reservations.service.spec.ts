import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppParkingSlotReservationsService } from './parking-app-parking-slot-reservations.service';

describe('ParkingAppParkingSlotReservationsService', () => {
  let service: ParkingAppParkingSlotReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingAppParkingSlotReservationsService],
    }).compile();

    service = module.get<ParkingAppParkingSlotReservationsService>(ParkingAppParkingSlotReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
