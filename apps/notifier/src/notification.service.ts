import { HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { log } from 'node:console';
import { catchError, firstValueFrom, of, retry } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Message } from '@mqb/libs/src/message.interface';

type AxiosErrorCustom = Required<
  Pick<AxiosError, 'response' | 'status'> & AxiosError
>;

@Injectable()
export class NotificationService {
  private readonly receiverUrl = 'http://receiver:4000';

  constructor(private readonly http: HttpService) {}

  async notify(message: Message): Promise<HttpStatus> {
    const response = await firstValueFrom(
      this.http.post(this.receiverUrl, message).pipe(
        catchError((error: AxiosErrorCustom) => {
          const { status, statusText } = error.response;
          log(
            `${message.id} - !ERROR: Receiver responded '${status} ${statusText}'`,
          );
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

    log(`${message.id} - Receiver responded '${response.statusText}'`);

    return response.status;
  }
}
