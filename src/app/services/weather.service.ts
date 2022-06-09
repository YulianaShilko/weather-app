import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { generalSelectors } from '../store/general.selector';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  public isShow$ = this.store.select(generalSelectors.isShown);
  public isLoading$ = this.store.select(generalSelectors.isLoading);
  public currentCity$ = this.store.select(generalSelectors.currentCity);
  public generalWeather$ = this.store.select(generalSelectors.weather);
  public generalForecast$ = this.store.select(generalSelectors.forecast);

  constructor(private store: Store) {}
}
