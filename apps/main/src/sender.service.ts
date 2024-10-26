import { Inject, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  RmqRecord,
  RmqRecordBuilder,
} from '@nestjs/microservices';
import { log } from 'node:console';
import { Message } from '@mqb/libs/src/message.interface';
import { LoggerService } from '@mqb/libs/dist/logger.service';

@Injectable()
export class SenderService {
  private messageCount = 0;
  private timeout: NodeJS.Timeout;

  constructor(@Inject('RMQ') private rmqService: ClientProxy) {}

  start() {
    // new LoggerService().log1('Main service started');

    this.timeout = setInterval(() => this.send(), 2000);
  }

  stop() {
    clearInterval(this.timeout);
    this.messageCount = 0;
  }

  private send() {
    this.messageCount += 1;

    // if (this.messageCount === 5) {
    //   return this.stop();
    // }

    const message: Message = { id: this.messageCount };

    const record: RmqRecord = new RmqRecordBuilder(message)
      .setOptions({
        priority: 1,
        // persistent: true,
      })
      .build();

    this.rmqService.emit('bus', record);

    const logger = new LoggerService();
    logger.log(message);
    log(`${message.id} - Main sent message`);
  }

  // @EventPattern('user_created')
  // async handleUserCreated(data: Record<string, unknown>) {
  //   // business logic
  // }

  // @EventPattern('default')
  // async sub(@Payload() data: any, @Ctx() ctx: any) {
  //   log(data);
  //   log(ctx);
  //   // this.notificationService.emit(pattern, event);
  // }

  // @EventPattern('abc')
  // async sub2(@Payload() data: any, @Ctx() ctx: any) {
  //   log(data);
  //   log(ctx);
  //   // this.notificationService.emit(pattern, event);
  // }
}
