import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { log } from 'console';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller()
export class AppController {
  private messageCount = 0;

  @Post()
  post(@Body() message: any) {
    this.messageCount += 1;

    log(
      `${message.id} - Receiver received via Http`,
      `total received ${this.messageCount}`,
    );
  }

  // @Get()
  // get(@Body() body: unknown) {
  //   log('Receiver received via Http', body);
  // }
}
