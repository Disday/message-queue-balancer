import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationService } from './app.service';
import { log } from 'node:console';
import { Message } from '@mqb/libs/src/message.interface';

@Controller()
export class AppController {
  constructor(private readonly notificationService: NotificationService) {}

  // @UseFilters(new Filter())
  @EventPattern('bus')
  async sub(@Payload() message: Message, @Ctx() ctx: RmqContext) {
    log(`${message.id} - Notifier received message`);

    return this.notificationService.notify(message);
  }
}
