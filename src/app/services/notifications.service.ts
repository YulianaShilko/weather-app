import { EventEmitter, Injectable } from '@angular/core';

import { Notification } from '../interfaces/general';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  public sendNotifEvent = new EventEmitter<Notification>();
  public closeEvent = new EventEmitter<void>();
}
