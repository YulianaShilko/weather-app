import { Coordination } from './general';

export interface WeatherForecastResponse {
  cod: number;
  message: number;
  cnt: number;
  list: ItemWeather[];
  city: City;
}

export interface City {
  id: number;
  name: string;
  coord: Coordination;
  country: string;
  population: number;
}

export interface ItemWeather {
  id?: number;
  name?: string;
  dt: number;
  main: DetailsWeather;
  weather: GeneralWeather[];
  clouds?: Clouds;
  wind?: Wind;
  rain?: Rain;
  sys?: Sys;
  dt_txt: string;
  hour?: string;
  date?: string;
}

export interface DetailsWeather {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number;
}

export interface GeneralWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Sys {
  pod: string;
}

export type Rain = Record<string, number>;
