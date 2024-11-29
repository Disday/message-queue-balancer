import { HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { log } from 'node:console';
import { catchError, firstValueFrom, of, retry } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Message } from '@mqb/libs/src/message.interface';
import { LoggerService } from '@mqb/libs/dist/logger.service';

type AxiosErrorCustom = Required<
  Pick<AxiosError, 'response' | 'status'> & AxiosError
>;

@Injectable()
export class NotificationService {
  private readonly receiverUrl = 'http://receiver:4000';

  constructor(
    private readonly http: HttpService,
    private readonly logger: LoggerService,
  ) {}

  async notify(message: Message): Promise<HttpStatus> {
    const response = await firstValueFrom(
      this.http.post(this.receiverUrl, message).pipe(
        catchError((error: AxiosErrorCustom) => {
          const { status, statusText } = error.response;

          const errorMessage = `!ERROR! Receiver responded '${status} ${statusText}'`;
          this.logger.log(errorMessage, message.id);

          throw error;
        }),
        retry({
          count: 4,
          delay: 1000,
          resetOnSuccess: true,
        }),
        catchError((error: AxiosErrorCustom) => of(error.response)),
      ),
    );

    log(`Receiver responded '${response.statusText}'`, message.id);

    return response.status;
  }
}
