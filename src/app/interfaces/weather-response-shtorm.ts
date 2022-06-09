export interface WeatherResponseStorm {
  hours: HoursWeatherStorm[];
  meta: {
    dailyQuota: number;
    lat: number;
    lng: number;
    requestCount: number;
  };
}

export interface HoursWeatherStorm {
  time: string;
  airTemperature: {
    noaa: number;
    sg: number;
  };
}
