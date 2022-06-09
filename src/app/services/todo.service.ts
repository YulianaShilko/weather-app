import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo';
import { StorageService } from './storage.service';

const defaultTodoList: TodoItem[] = [];

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  todoList!: TodoItem[];

  constructor(private storageService: StorageService) {}

  public saveList(date: string): void {
    this.storageService.setData(date, this.todoList);
  }

  public getTodoList(key: string): TodoItem[] {
    if (this.storageService.getData(key)) {
      this.todoList = this.storageService.getData(key) || defaultTodoList;
    } else {
      this.todoList = [];
    }
    return this.todoList;
  }

  public addItem(item: TodoItem, date: string): void {
    this.todoList.push(item);
    this.saveList(date);
  }

  public deleteItem(item: TodoItem, date: string): void {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList(date);
  }
}
