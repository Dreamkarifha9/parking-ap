import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './configs/database.config';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { ParkingAppParkingLotsModule } from './parking-app/parking-app-parking-lots/parking-app-parking-lots.module';
import { BlocksModule } from './blocks/blocks.module';
import { ParkingAppBlocksModule } from './parking-app/parking-app-blocks/parking-app-blocks.module';
import { FloorsModule } from './floors/floors.module';
import { ParkingAppFloorsModule } from './parking-app/parking-app-floors/parking-app-floors.module';
import { SlotsModule } from './slots/slots.module';
import { ParkingAppSlotsModule } from './parking-app/parking-app-slots/parking-app-slots.module';
import { ParkingSlotReservationModule } from './parking-slot-reservation/parking-slot-reservation.module';
import { CustomerAppSlotReservationsModule } from './customer-app/customer-app-slot-reservations/customer-app-slot-reservations.module';
import { ParkingAppParkingSlotReservationsModule } from './parking-app/parking-app-parking-slot-reservations/parking-app-parking-slot-reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ParkingLotModule,
    ParkingAppParkingLotsModule,
    BlocksModule,
    ParkingAppBlocksModule,
    FloorsModule,
    ParkingAppFloorsModule,
    SlotsModule,
    ParkingAppSlotsModule,
    ParkingSlotReservationModule,
    CustomerAppSlotReservationsModule,
    ParkingAppParkingSlotReservationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
