/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { flow as flowfp, groupBy as groupByfp, map as mapfp } from 'lodash/fp';
import { CityDetails, Weather, WeatherForecast } from '../interfaces/general';
import { ItemWeather } from '../interfaces/weather-forecast-response';
import { WeatherResponse } from '../interfaces/weather-response';
import { HoursWeatherStorm, WeatherResponseStorm } from '../interfaces/weather-response-shtorm';

enum LettersNumber {
  finalLetter = 10,
  finalLetter2 = 11,
  finalLetter3 = 13,
}

export class WeatherHelper {
  public static buildWeather(item: WeatherResponse | ItemWeather, isForecast = false): Weather {
    let date: string;
    let hour: string;
    if (isForecast) {
      date = (item as ItemWeather).dt_txt.slice(0, LettersNumber.finalLetter);
      hour = (item as ItemWeather).dt_txt.slice(LettersNumber.finalLetter2);
    } else {
      const now = new Date().toISOString();
      date = this.convertDate(new Date(now));
      hour = '';
    }
    return {
      id: item.id,
      cityName: item.name,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      sea_level: item.main.sea_level,
      temp: item.main.temp,
      temp_max: item.main.temp_max,
      temp_min: item.main.temp_min,
      date,
      hour,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    };
  }

  public static buildWeatherStorm(response: WeatherResponseStorm | HoursWeatherStorm, isForecast = false): Weather {
    let date: string;
    let currentWeather: number;
    if (isForecast) {
      date = (response as HoursWeatherStorm).time.slice(0, LettersNumber.finalLetter);
      currentWeather = (response as HoursWeatherStorm).airTemperature.noaa;
    } else {
      const now = new Date().toISOString();
      currentWeather = (response as WeatherResponseStorm).hours.filter(
        (item: HoursWeatherStorm) =>
          // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
          now.slice(0, LettersNumber.finalLetter3) === item.time.slice(0, LettersNumber.finalLetter3),
      )[0].airTemperature.noaa;
      date = this.convertDate(new Date(now));
    }

    return {
      id: null,
      cityName: '',
      humidity: null,
      pressure: null,
      sea_level: null,
      temp: currentWeather,
      temp_max: null,
      temp_min: null,
      date,
      hour: null,
      description: '',
      icon: null,
    };
  }

  public static buildForcastByDayStorm(weatherResponseList: HoursWeatherStorm[]): WeatherForecast {
    return flowfp([
      mapfp((item: HoursWeatherStorm) => this.buildWeatherStorm(item, true)),
      groupByfp((item: any) => item.date),
    ])(weatherResponseList);
  }

  public static buildForcastByDay(weatherResponseList: ItemWeather[], currentCity: CityDetails): WeatherForecast {
    return flowfp([
      mapfp((item: ItemWeather) => {
        item.id = currentCity.id;
        item.name = currentCity.name;
        return item;
      }),
      mapfp((item: ItemWeather) => this.buildWeather(item, true)),
      groupByfp((item: any) => item.date),
    ])(weatherResponseList);
  }

  private static convertDate(date: Date): string {
    const currDate = date.getDate();
    const currMonth = date.getMonth() + 1;
    const currYear = date.getFullYear();
    return `${currYear}-${currMonth}-${currDate}`;
  }
}
