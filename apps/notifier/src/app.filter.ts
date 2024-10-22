import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { log } from 'console';
import { Request, Response } from 'express';
import { throwError } from 'rxjs';

@Catch()
export class HttpExceptionFilter implements RpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    log(exception.getError());

    return throwError(() => {});
  }
}