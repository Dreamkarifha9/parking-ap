import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './configs/database.config';
import { CarParkLotModule } from './car-park-lot/car-park-lot.module';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { ParkingLotModule } from './parking-lot/parking-lot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    CarParkLotModule,
    ParkingLotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
