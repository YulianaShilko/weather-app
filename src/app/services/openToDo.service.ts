import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenToDoService {
  private childClickedEvent = new BehaviorSubject<string>('');

  public shareDateEvent(msg: string): void {
    this.childClickedEvent.next(msg);
  }

  public dateEventListener(): Observable<string> {
    return this.childClickedEvent.asObservable();
  }
}
