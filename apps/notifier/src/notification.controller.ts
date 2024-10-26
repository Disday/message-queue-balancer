import { Controller, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import {
  ClientProxy,
  ClientRMQ,
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  RmqRecord,
} from '@nestjs/microservices';
import { log } from 'node:console';
import { Message } from '@mqb/libs/src/message.interface';
import { NotificationService } from './notification.service';
import { ChannelWrapper } from 'amqp-connection-manager';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class NotificationController {
  // private readonly channel: ChannelWrapper;
  // private readonly rmqMessage: unknown;

  constructor(
    // @Inject('RMQ') private rmqService: ClientRMQ,
    private readonly notificationService: NotificationService,
  ) {}

  @EventPattern('bus')
  async sub(@Payload() message: Message, @Ctx() ctx: RmqContext) {
    log(`${message.id} - Notifier received message`);

    const responseStatus = await this.notificationService.notify(message);

    if (responseStatus === HttpStatus.OK) {
      return this.ack(ctx);
    }

    log('nack');
    this.nack(ctx);
  }

  private ack(ctx: RmqContext) {
    const channel: ChannelWrapper = ctx.getChannelRef();
    channel.ack(ctx.getMessage());
  }

  private nack(ctx: RmqContext) {
    const channel: ChannelWrapper = ctx.getChannelRef();
    channel.nack(ctx.getMessage());
  }
}
