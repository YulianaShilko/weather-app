import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.scss'],
})
export class AddTodoItemComponent {
  @Output() addTodoEvent: EventEmitter<string> = new EventEmitter<string>();
  title = 'learn Angular';

  public addTodo(newTitle: string): void {
    this.addTodoEvent.emit(newTitle);
  }
}
