import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AxiosError, AxiosResponse } from 'axios';
import { log } from 'node:console';
import { catchError, EMPTY, firstValueFrom, ObservableInput, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Message } from '@mqb/libs/src/message.interface';

// type AxiosErrorWithMessage = Required<
//   Pick<AxiosError<{ message: string }>, 'response'>
// >;
// type AxiosErrorWithMessage = Required<AxiosError<unknown>>;

@Injectable()
export class NotificationService {
  private readonly receiverUrl = 'http://receiver:4000';

  constructor(private readonly http: HttpService) {}

  async notify(message: Message): Promise<unknown> {
    const response = await firstValueFrom(
      this.http.post(this.receiverUrl, message).pipe(
        catchError((error: AxiosError) => {
          throw new RpcException(
            `${message.id} - !ERROR: Receiver responded '${error.message}'`,
          );
        }),
      ),
    );

    // log(response);
    return response.data;
  }
}
