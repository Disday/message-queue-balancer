import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  notify(data:unknown): string {
    return 'Hello World!';
  }
}
