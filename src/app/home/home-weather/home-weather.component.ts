import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CityDetails, Weather, WeatherForecast } from '../../interfaces/general';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home-weather',
  templateUrl: './home-weather.component.html',
  styleUrls: ['./home-weather.component.scss'],
})
export class HomeWeatherComponent {
  @Input() weather!: Weather;
  @Input() forecast!: WeatherForecast;
  @Input() cityDetails!: CityDetails | null;
}
