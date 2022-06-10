/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { WeatherForecast, Weather } from '../../../interfaces/general';

enum forecastLength {
  minLength = 4,
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  @Input() forecast!: WeatherForecast;
  public list: Weather[] = [];

  public ngOnInit(): void {
    const forecastArr = Object.entries(this.forecast);
    forecastArr.shift();
    if (forecastArr.length > forecastLength.minLength) {
      forecastArr.splice(0, 1);
      forecastArr.splice((forecastLength.minLength as number) + 1);
    }
    forecastArr.forEach((e: any) => {
      const size = e[1].length;
      const place = Math.floor(size / 2);
      const element = e[1][place - 1] || e[1][place];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.list.push(element);
    });
  }
}
