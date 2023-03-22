import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ParkingSlotReservation } from './entities/parking-slot-reservation.entity';
import { ParkingSlotReservationService } from './parking-slot-reservation.service';

import { VWParkingSlotsService } from '../slots/vw-parking-slots.service';
import { SlotsService } from '../slots/slots.service';
import { VWParkingSlot } from '../slots/entities/vw-parking-slot.entity';
import { Slot } from '../slots/entities/slot.entity';
import { addMilliseconds } from 'date-fns';
import { Repository } from 'typeorm';
import { CreateParkingSlotReservationDto } from './dto/create-parking-slot-reservation.dto';
import { ECarSize } from '../shared/enums';
const parkingSlotReservationEntityList: Partial<ParkingSlotReservation>[] = [
  {
    slotId: 1,
    startTimestamp: addMilliseconds(new Date(), 1),
    exitTimestamp: addMilliseconds(new Date(), 1),
    durationInMinutes: 10,
    bookingDate: addMilliseconds(new Date(), 1),
    numberPlate: 'กท.1111',
    carSize: ECarSize.SMAILL,
  },
  {
    slotId: 1,
    startTimestamp: addMilliseconds(new Date(), 2),
    exitTimestamp: addMilliseconds(new Date(), 2),
    durationInMinutes: 10,
    bookingDate: addMilliseconds(new Date(), 2),
    numberPlate: 'กท.2222',
    carSize: ECarSize.SMAILL,
  },
  {
    slotId: 1,
    startTimestamp: addMilliseconds(new Date(), 3),
    exitTimestamp: addMilliseconds(new Date(), 3),
    durationInMinutes: 10,
    bookingDate: addMilliseconds(new Date(), 3),
    numberPlate: 'กท.3333',
    carSize: ECarSize.SMAILL,
  },
];

describe('ParkingSlotReservationService', () => {
  let parkingSlotReservationService: ParkingSlotReservationService;

  const mockCreateParkingSlotReservation = {
    suscuess: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ParkingSlotReservationService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue(parkingSlotReservationEntityList),
            findOneByNumberPlate: jest
              .fn()
              .mockResolvedValue(parkingSlotReservationEntityList[0]),
          },
        },
        {
          provide: VWParkingSlotsService,
          useValue: {
            findOneBySearch: jest.fn(),
          },
        },
        {
          provide: SlotsService,
          useValue: {},
        },
      ],
    }).compile();

    parkingSlotReservationService = module.get<ParkingSlotReservationService>(
      ParkingSlotReservationService,
    );
  });

  it('should be defined', () => {
    expect(parkingSlotReservationService).toBeDefined();
  });

  describe('findAll', () => {
    it('findAll successfully', async () => {
      const data = {
        deleted: false,
        size: 20,
      };
      const result = await parkingSlotReservationService.findAll(data);
      expect(result).toEqual(parkingSlotReservationEntityList);
    });
  });

  describe('findOneNumbePlate', () => {
    it('findOneByNumberPlate', async () => {
      const result = await parkingSlotReservationService.findOneByNumberPlate(
        parkingSlotReservationEntityList[0].numberPlate,
      );
      expect(result).toEqual(parkingSlotReservationEntityList[0]);
    });
  });
});
