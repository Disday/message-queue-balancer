import { BadRequestException, Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { log } from 'node:console';
import { SenderService } from './sender.service';

@Controller()
export class SenderController {
  constructor(private readonly appService: SenderService) {}

  @Get('/start')
  start() {
    return this.appService.start();
  }

  @Get('/stop')
  stop() { 
    return this.appService.stop();
  }

  // @EventPattern('bus') stub() {}
  // async sub2(@Payload() data: any, @Ctx() ctx: any) {
  // log(data);
  // log(ctx.getMessage(), ctx.getPattern());
  // this.notificationService.emit(pattern, event);
  // }
}
