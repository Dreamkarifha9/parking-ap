/* eslint-disable no-console */
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService: ConfigService = app.get(ConfigService);
  const env = configService.get('NODE_ENV', 'development');
  const version = 'v1.0';
  const globalPrefix = `/api/${version}`;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (env === 'development') {
    const options = new DocumentBuilder()
      .setTitle('PARKING SYSTEM API')
      .setDescription('The PARKING SYSTEM API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/docs/', app, document);
  }

  app.enableCors({
    origin: [...configService.get('CORS_ORIGINS', '').split(',')],
  });

  await app.startAllMicroservices();
  const port = configService.get('PORT') || '3000';
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`with ${env} environment`);
  console.log(`docs ${await app.getUrl()}/api/docs`);
}
bootstrap();
