import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { TransferModule } from './transfer.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TransferModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 8092,
    },
  });
  app.listen(() => logger.log('Microservice Transfer is listening'));
}

bootstrap();
