import { Controller, HttpStatus } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Message } from '@mqb/libs/src/message.interface';
import { NotificationService } from './notification.service';
import { ChannelWrapper } from 'amqp-connection-manager';
import { LoggerService } from '@mqb/libs/dist/logger.service';

@Controller()
export class NotificationController {
  // private readonly channel: ChannelWrapper;

  constructor(
    // @Inject('RMQ') private rmqService: ClientRMQ,
    private readonly logger: LoggerService,
    private readonly notificationService: NotificationService,
  ) {}

  @EventPattern('bus')
  async sub(@Payload() message: Message, @Ctx() ctx: RmqContext) {
    this.logger.log('Notifier received message', message.id);

    const responseStatus = await this.notificationService.notify(message);

    if (responseStatus === HttpStatus.OK) {
      return this.ack(ctx);
    }

    this.logger.log('Message nacked', message.id);
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
