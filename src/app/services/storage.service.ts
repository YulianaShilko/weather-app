import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public getData(key: string): TodoItem[] | '' {
    const p = localStorage.getItem(key);
    if (p) {
      return JSON.parse(p) as TodoItem[];
    }
    return '';
  }

  public setData(key: string, data: TodoItem[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
