export interface Coordination {
  lon: number;
  lat: number;
}

export interface Notification {
  message: string;
  type: 'primary' | 'error';
  status?: number;
}

export interface CityDetails {
  name: string;
  id: number;
}

export interface Weather {
  id: number | undefined | null;
  cityName: string | undefined;
  humidity: number | null;
  pressure: number | null;
  sea_level: number | undefined | null;
  temp: number;
  temp_max: number | null;
  temp_min: number | null;
  date: string;
  hour: string | null;
  description: string;
  icon: string | null;
}

export interface GeneralState {
  data: CityWeather;
  currentCity: CityDetails | null;
  isShown: boolean;
  isLoading: boolean;
  status?: string;
}

export interface CityWeather {
  weather: Weather;
  forecast?: WeatherForecast;
}

export type WeatherForecast = Record<string, Weather[]>;

export const initialGeneralState: GeneralState = {
  data: {
    weather: {
      id: null,
      cityName: undefined,
      humidity: null,
      pressure: null,
      sea_level: null,
      temp: 0,
      temp_max: null,
      temp_min: null,
      date: '',
      hour: null,
      description: '',
      icon: null,
    },
  },
  currentCity: null,
  isShown: false,
  isLoading: false,
  status: '',
};
