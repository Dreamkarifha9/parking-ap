import { Test, TestingModule } from '@nestjs/testing';
import { ParkingAppParkingSlotReservationsController } from './parking-app-parking-slot-reservations.controller';
import { ParkingAppParkingSlotReservationsService } from './parking-app-parking-slot-reservations.service';

describe('ParkingAppParkingSlotReservationsController', () => {
  let controller: ParkingAppParkingSlotReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingAppParkingSlotReservationsController],
      providers: [ParkingAppParkingSlotReservationsService],
    }).compile();

    controller = module.get<ParkingAppParkingSlotReservationsController>(ParkingAppParkingSlotReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
