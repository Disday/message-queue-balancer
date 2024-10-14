import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { AppService, NotificationService } from './app.service';
import { log } from 'console';

@Controller()
export class AppController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('bus')
  async sub(@Payload() message: unknown, @Ctx() ctx: any) {
    log('Notifier received message', message);

    this.notificationService.notify(message);
  }
}
