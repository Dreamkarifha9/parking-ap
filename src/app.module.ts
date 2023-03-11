import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './configs/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
