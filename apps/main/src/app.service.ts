import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { log } from 'node:console';
import { Message } from '@mqb/libs/src/message.interface';

@Injectable()
export class AppService {
  private messageCount = 0;
  private timeout: NodeJS.Timeout;

  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
  ) {}

  start() {
    this.timeout = setInterval(() => {
      this.messageCount += 1;
      const message: Message = { id: this.messageCount };

      this.notificationService.emit('bus', message);

      log(`${this.messageCount} - Main sent message`);
    }, 2000);
  }

  stop() {
    clearInterval(this.timeout);
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
