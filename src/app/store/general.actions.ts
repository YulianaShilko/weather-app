import { createAction, props } from '@ngrx/store';
import { CityDetails, Weather, WeatherForecast } from 'src/app/interfaces/general';

export const WeatherActions = {
  loadWeather: createAction('[WEATHER] Load', props<{ town: string }>()),
  loadGeoWeather: createAction(
    '[WEATHER] Load Geo',
    props<{
      lon: number;
      lat: number;
    }>(),
  ),
  loadGeoWeatherStorm: createAction(
    '[WEATHER] Load Geo Storm',
    props<{
      lon: number;
      lat: number;
    }>(),
  ),
  successLoadWeather: createAction('[WEATHER] Success', props<{ status: string; cityDetails: CityDetails }>()),
  errorLoadWeather: createAction('[WEATHER] Error', props<{ error: string }>()),
  updateWeather: createAction('[WEATHER] Update', props<{ weather: Weather }>()),
  updateForecast: createAction('[Forecast] Update', props<{ forecast: WeatherForecast }>()),
};
