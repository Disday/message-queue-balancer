import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './app.service';
import { log } from 'console';

@Controller()
export class AppController {
  constructor(private readonly notificationService: NotificationService) {}

  // @UseFilters(new Filter())
  @EventPattern('bus')
  async sub(@Payload() message: any, @Ctx() ctx: any) {
    log(`${message.id} - Notifier received`, message);

    return this.notificationService.notify(message);
  }
}
