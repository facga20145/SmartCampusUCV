import { Logger } from '@nestjs/common';

export class LoggerUtil {
  private static logger = new Logger('HTTP');

  static logRequest(method: string, url: string) {
    this.logger.log(`${method} ${url} - ${new Date().toISOString()}`);
  }
}
