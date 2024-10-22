import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

async function bootstrap() {
  // const rmq = 'rabbitmq';
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:5672`],
      // queue: 'bus',
      queueOptions: {
        durable: false,
      },
      noAck: true,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  app.get(AppService).start();
}

bootstrap();
