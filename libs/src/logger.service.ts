export class LoggerService {
  log(message: string, traceId?: number) {
    console.log(`${traceId}: ${message}`);
  }
}
