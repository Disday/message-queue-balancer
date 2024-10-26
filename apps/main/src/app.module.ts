import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RMQ',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://rabbitmq:5672`],
          queue: 'bus',
          prefetchCount: 1,
          queueOptions: {
            durable: false,
          },
          noAck: true,
        },
      },
    ]),
  ],
  controllers: [SenderController],
  providers: [SenderService],
})
export class AppModule {}
