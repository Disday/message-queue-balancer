import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './app.filter';
// import { HttpExceptionFilter } from './app.filter';

async function bootstrap() {
  // const rmq = 'rabbitmq';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        queue: 'bus',
        urls: [`amqp://rabbitmq:5672`],
        queueOptions: {
          durable: true,
        },
        noAck: false,
      },
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen();

  // const service = app.get(AppService);
  // service.publish('abc', { a: 1 });
}
bootstrap();
