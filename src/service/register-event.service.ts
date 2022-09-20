import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RegisterEvent } from '../event/register-event';
import { KeywordRepository } from '../repository/keyword.repository';
import { NotificationService } from './notification.service';

@Injectable()
export class RegisterEventService {
  constructor(
    private readonly keywordRepository: KeywordRepository,
    private readonly notificationService: NotificationService,
  ) {}

  @OnEvent('register.*', { async: true })
  async handleRegisterEvent(registerEvent: RegisterEvent) {
    const entities = await this.keywordRepository.findAllBy(
      registerEvent.authorName,
    );
    if (registerEvent.isSend(entities)) {
      await this.notificationService.send();
    }
  }
}
