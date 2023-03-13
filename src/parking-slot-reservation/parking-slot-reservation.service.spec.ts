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

describe('ParkingSlotReservationService', () => {
  let parkingSlotReservationService: ParkingSlotReservationService;
  let parkingSlotReservationRepository: Repository<ParkingSlotReservation>;
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

  const mockCreateParkingSlotReservation = {
    suscuess: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingSlotReservationService,
        VWParkingSlotsService,
        SlotsService,
        {
          provide: getRepositoryToken(ParkingSlotReservation),
          useValue: {
            checkIn: jest.fn(),
            checkOut: jest.fn(),
            findOneBySearch: jest.fn(),
            findAll: jest
              .fn()
              .mockResolvedValue(parkingSlotReservationEntityList),
            findOneByNumberPlate: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(VWParkingSlot),
          useValue: {
            findOneBySearch: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Slot),
          useValue: {},
        },
      ],
    }).compile();

    parkingSlotReservationService = module.get<ParkingSlotReservationService>(
      ParkingSlotReservationService,
    );
    parkingSlotReservationRepository = module.get<
      Repository<ParkingSlotReservation>
    >(getRepositoryToken(ParkingSlotReservation));
  });

  it('should be defined', () => {
    expect(parkingSlotReservationService).toBeDefined();
  });

  describe('check-in', () => {
    it('check in successfully', async () => {
      const data: CreateParkingSlotReservationDto = {
        numberPlate: 'กท.1111',
        carSize: ECarSize.SMAILL,
      };
      const reuslt = await parkingSlotReservationService.checkIn(data);

      expect(reuslt).toEqual({ suscuess: true });
    });
  });
});
