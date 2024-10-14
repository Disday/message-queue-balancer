import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { log } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello() {
    // throw new BadRequestException();
    return this.appService.publish();
  }

  // @EventPattern('bus') stub() {}
  // async sub2(@Payload() data: any, @Ctx() ctx: any) {
  // log(data);
  // log(ctx.getMessage(), ctx.getPattern());
  // this.notificationService.emit(pattern, event);
  // }
}
