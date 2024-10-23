import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { log } from 'node:console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/start')
  start() {
    return this.appService.start();
  }

  // @Get('/stop')
  // stop() {
  //   return this.appService.stop();
  // }

  // @EventPattern('bus') stub() {}
  // async sub2(@Payload() data: any, @Ctx() ctx: any) {
  // log(data);
  // log(ctx.getMessage(), ctx.getPattern());
  // this.notificationService.emit(pattern, event);
  // }
}
