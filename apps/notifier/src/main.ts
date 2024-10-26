import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { HttpExceptionFilter } from './app.filter';
// import { HttpExceptionFilter } from './app.filter';

async function bootstrap() {
  // const rmq = 'rabbitmq';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://rabbitmq:5672`],
        queue: 'bus',
        prefetchCount: 1,
        consumerTag: 'notifier-service',
        queueOptions: {
          durable: false,
        },
        noAck: false,
      },
    },
  );

  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen();

  // const service = app.get(AppService);
  // service.publish('abc', { a: 1 });
}
bootstrap();
