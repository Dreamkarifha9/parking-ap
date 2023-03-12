import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAppSlotReservationsService } from './customer-app-slot-reservations.service';

describe('CustomerAppSlotReservationsService', () => {
  let service: CustomerAppSlotReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerAppSlotReservationsService],
    }).compile();

    service = module.get<CustomerAppSlotReservationsService>(CustomerAppSlotReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
