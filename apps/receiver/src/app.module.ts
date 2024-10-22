import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ThrottlerModule.forRoot([{ ttl: 10000, limit: 2 }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
