import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { WeatherForecastResponse } from '../interfaces/weather-forecast-response';
import { WeatherResponse } from '../interfaces/weather-response';
import { WeatherResponseStorm } from '../interfaces/weather-response-shtorm';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private keyAPI = 'de710933c5e7078798580c96270dae75';

  constructor(private http: HttpClient) {}

  public getWeather(city: string): Observable<WeatherResponse> {
    const url = `${environment.OPENWEATHER_API.weather}&q=${city}&appid=${this.keyAPI}`;
    return this.http.get(url) as Observable<WeatherResponse>;
  }

  public getForecast(city: string): Observable<WeatherForecastResponse> {
    const url = `${environment.OPENWEATHER_API.forecast}&q=${city}&appid=${this.keyAPI}`;
    return this.http.get(url) as Observable<WeatherForecastResponse>;
  }

  public getWeatherGeo(lon: number, lat: number): Observable<WeatherResponse> {
    const url = `${environment.OPENWEATHER_API.weather}&lat=${lat}&lon=${lon}&appid=${this.keyAPI}`;
    return this.http.get(url) as Observable<WeatherResponse>;
  }

  public getForecastGeo(lon: number, lat: number): Observable<WeatherForecastResponse> {
    const url = `${environment.OPENWEATHER_API.forecast}&lat=${lat}&lon=${lon}&appid=${this.keyAPI}`;
    return this.http.get(url) as Observable<WeatherForecastResponse>;
  }

  public getWeatherGeoStorm(lon: number, lat: number): Observable<WeatherResponseStorm> {
    const headerDict = {
      Authorization: 'faf7f94e-e442-11ec-b790-0242ac130002-faf7f9b2-e442-11ec-b790-0242ac130002',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const url = `${environment.STORMGLASS_API}lat=${lat}&lng=${lon}&params=waveHeight,airTemperature`;

    return this.http.get(url, requestOptions) as Observable<WeatherResponseStorm>;
  }
}
