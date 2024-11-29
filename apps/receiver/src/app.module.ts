import { Logger, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ReceiverController } from './receiver.controller';
import { LoggerService } from '@mqb/libs/dist/logger.service';

@Module({
  imports: [ThrottlerModule.forRoot([{ ttl: 10000, limit: 2 }])],
  controllers: [ReceiverController],
  providers: [LoggerService],
})
export class AppModule {}
