import { Pipe, PipeTransform } from '@angular/core';

enum changeGradus {
  fahrenheit = 273.15,
  minLength = 100,
}

@Pipe({ name: 'CelsiumPipe' })
export class ChangeCelsiumPipe implements PipeTransform {
  public transform(value: number): number {
    if (value > changeGradus.minLength) {
      const newValue = Math.round(value - changeGradus.fahrenheit);
      return newValue;
    }
    return Math.round(value);
  }
}
