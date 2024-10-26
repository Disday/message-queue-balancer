import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'RMQ',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [`amqp://rabbitmq:5672`],
    //       queue: 'bus',
    //       queueOptions: {
    //         durable: false,
    //       },
    //       noAck: true,
    //     },
    //   },
    // ]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ThrottlerModule.forRoot([{ ttl: 1000, limit: 1 }]),
  ],

  controllers: [NotificationController],
  providers: [NotificationService],
})
export class AppModule {}
