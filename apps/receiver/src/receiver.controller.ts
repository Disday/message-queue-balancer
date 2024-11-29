import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
// import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { LoggerService } from '@mqb/libs/dist/logger.service';
import { Message } from '@mqb/libs/src/message.interface';
import { ThrottlerGuard } from '@nestjs/throttler';
import { log } from 'console';

@UseGuards(ThrottlerGuard)
@Controller()
export class ReceiverController {
  private messageCount = 0;

  constructor(private readonly logger: LoggerService) {}

  @Post()
  @HttpCode(200)
  post(@Body() message: Message) {
    this.messageCount += 1;

    this.logger.log(
      `Receiver received via Http, total received ${this.messageCount}`,
      message.id,
    );
  }
}
