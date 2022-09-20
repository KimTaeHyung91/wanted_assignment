import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async send() {
    this.logger.log('알림 보냅니다');
  }
}
