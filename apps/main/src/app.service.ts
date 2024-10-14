import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { log } from 'console';

@Injectable()
export class AppService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
  ) {}

  // @EventPattern('user_created')
  // async handleUserCreated(data: Record<string, unknown>) {
  //   // business logic
  // }

  async publish() {
    let counter = 0;

    setInterval(() => {
      counter += 1;
      this.notificationService.emit('bus', { counter });
    }, 1000);
  }

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

  getHello(): string {
    return 'Hello World!';
  }
}
