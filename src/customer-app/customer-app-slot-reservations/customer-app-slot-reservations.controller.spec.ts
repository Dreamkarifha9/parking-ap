import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAppSlotReservationsController } from './customer-app-slot-reservations.controller';
import { CustomerAppSlotReservationsService } from './customer-app-slot-reservations.service';

describe('CustomerAppSlotReservationsController', () => {
  let controller: CustomerAppSlotReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAppSlotReservationsController],
      providers: [CustomerAppSlotReservationsService],
    }).compile();

    controller = module.get<CustomerAppSlotReservationsController>(CustomerAppSlotReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
