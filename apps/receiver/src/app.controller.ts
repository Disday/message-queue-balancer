import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { log } from 'console';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}


  @EventPattern('bus')
  async sub2(@Payload() data: any, @Ctx() ctx: any) {
    log(data);
    // log( ctx.getMessage(), ctx.getPattern());
    // this.notificationService.emit(pattern, event);
  }
}
