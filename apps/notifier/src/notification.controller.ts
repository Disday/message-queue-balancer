import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { log } from 'node:console';
import { Message } from '@mqb/libs/src/message.interface';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @UseFilters(new Filter())
  @EventPattern('bus')
  async sub(@Payload() message: Message, @Ctx() ctx: RmqContext) {
    log(`${message.id} - Notifier received message`);

    return this.notificationService.notify(message);
  }
}
