import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { log } from 'console';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Message } from '@mqb/libs/src/message.interface';

@UseGuards(ThrottlerGuard)
@Controller()
export class ReceiverController {
  private messageCount = 0;

  @Post()
  post(@Body() message: Message) {
    this.messageCount += 1;

    log(
      `${message.id} - Receiver received via Http`,
      `total received ${this.messageCount}`,
    );
  }
}
