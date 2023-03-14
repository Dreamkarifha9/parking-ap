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
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
describe('ParkingSlotReservationService', () => {
  let parkingSlotReservationService: ParkingSlotReservationService;
  let parkingSlotReservationRepository: MockRepository<ParkingSlotReservation>;

  const mockCreateParkingSlotReservation = {
    suscuess: true,
  };

  const mockRepository = () => ({
    createQueryBuilder: jest.fn().mockRejectedValue({
      innerJoint: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockReturnThis(),
    }),
    findAll: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingSlotReservationService,
        VWParkingSlotsService,
        SlotsService,
        {
          provide: getRepositoryToken(ParkingSlotReservation),
          useValue: mockRepository,
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
      MockRepository<ParkingSlotReservation>
    >(getRepositoryToken(ParkingSlotReservation));
  });

  it('should be defined', () => {
    expect(parkingSlotReservationService).toBeDefined();
  });

  describe('findAll', () => {
    it('parkingSlotReservationRepository createQueryBuilder in successfully', async () => {
      expect(
        parkingSlotReservationRepository.createQueryBuilder,
      ).toHaveBeenCalledTimes(1);
    });
    it('check in successfully', async () => {
      jest
        .spyOn(
          parkingSlotReservationRepository.createQueryBuilder(),
          'getRawMany',
        )
        .mockResolvedValue([]);
      const data = {
        deleted: false,
        size: 20,
      };
      const reuslt = await parkingSlotReservationService.findAll(data);

      expect(reuslt).toEqual(parkingSlotReservationEntityList);
    });
  });
});
