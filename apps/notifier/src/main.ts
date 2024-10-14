import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

async function bootstrap() {
  // const rmq = 'rabbitmq';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://rabbitmq:5672`],
        queue: 'bus',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();

  // const service = app.get(AppService);
  // service.publish('abc', { a: 1 });
}
bootstrap();
