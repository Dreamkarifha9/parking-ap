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
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
