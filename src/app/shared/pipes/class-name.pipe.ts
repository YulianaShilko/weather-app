import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ClassCasePipe' })
export class ChangeClassNamePipe implements PipeTransform {
  public transform(value: string): string {
    const newValue = value.replace(/\s/g, '');
    return newValue;
  }
}
