import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class AppModule {}
