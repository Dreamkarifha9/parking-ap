import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ParkingSlotReservation } from './entities/parking-slot-reservation.entity';
import { ParkingSlotReservationService } from './parking-slot-reservation.service';
import { createMock } from '@golevelup/ts-jest';

describe('ParkingSlotReservationService', () => {
  let service: ParkingSlotReservationService;

  const mockParkingLotReservationRepository = {

  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ParkingSlotReservationService,
          useValue: createMock<ParkingSlotReservationService>(),
        },

      ],
    }).compile();

    service = module.get<ParkingSlotReservationService>(ParkingSlotReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
