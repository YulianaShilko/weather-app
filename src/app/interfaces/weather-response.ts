import { Coordination } from './general';
import { Clouds, DetailsWeather, GeneralWeather, Wind } from './weather-forecast-response';

export interface WeatherResponse {
  coord: Coordination;
  weather: GeneralWeather[];
  base: string;
  main: DetailsWeather;
  visibility: number;
  wind?: Wind;
  clouds?: Clouds;
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
}
