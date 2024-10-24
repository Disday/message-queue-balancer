import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ReceiverController } from './receiver.controller';

@Module({
  imports: [ThrottlerModule.forRoot([{ ttl: 10000, limit: 2 }])],
  controllers: [ReceiverController],
  // providers: [AppService],
})
export class AppModule {}
