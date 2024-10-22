import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AxiosError } from 'axios';
import { log } from 'console';
import { catchError, EMPTY, firstValueFrom, ObservableInput, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Message } from '@mqb/libs/src/message.interface';

@Injectable()
export class NotificationService {
  private readonly receiverUrl = 'http://receiver:4000';

  constructor(private readonly http: HttpService) {}

  async notify(message: Message): Promise<any> {
    const { data: response } = await firstValueFrom(
      this.http.post(this.receiverUrl, message).pipe(
        catchError((error: Required<Pick<AxiosError<any>, 'response'>>) => {
          throw new RpcException(
            `${message.id} - !ERROR: Receiver responded ${error.response.data.message}`,
          );
        }),
      ),
    );

    // log(response);
    return response;
  }
}
