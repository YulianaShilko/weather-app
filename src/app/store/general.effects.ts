/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concat, forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notifications.service';
import { ApiService } from '../services/api.service';
import { WeatherHelper } from '../utils/weather.helper';
import { WeatherActions } from './general.actions';

enum numbers {
  millisecondsInMinute = 60000,
  minutesInThreeHours = 180,
}
const cache = new Map();

@Injectable()
export class GeneralEffects {
  loadWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      switchMap((action) => {
        const firstPossibleMinute =
          +Math.round(Date.now() / numbers.millisecondsInMinute) - numbers.minutesInThreeHours;
        const possibleMinutesArray = Array(numbers.minutesInThreeHours)
          .fill(firstPossibleMinute)
          .map((v: number = firstPossibleMinute, i = 0) => v + i);
        if (
          cache.has(action.town) &&
          possibleMinutesArray.includes(
            Math.round(Date.parse(cache.get(action.town)[1].list[0].dt_txt) / numbers.millisecondsInMinute),
          )
        ) {
          const dataCache = cache.get(action.town);
          const weather = WeatherHelper.buildWeather(dataCache[0]);
          const forecast = WeatherHelper.buildForcastByDay(dataCache[1].list, {
            name: dataCache[1].city.name,
            id: dataCache[1].city.id,
          });
          return concat([
            WeatherActions.updateWeather({ weather }),
            WeatherActions.updateForecast({ forecast }),
            WeatherActions.successLoadWeather({
              status: 'success to load the weather',
              cityDetails: { name: dataCache[0].name, id: dataCache[0].id },
            }),
          ]);
        }
        return forkJoin(this.apiService.getWeather(action.town), this.apiService.getForecast(action.town)).pipe(
          switchMap((res) => {
            cache.set(action.town, res);
            const weather = WeatherHelper.buildWeather(res[0]);
            const forecast = WeatherHelper.buildForcastByDay(res[1].list, {
              name: res[1].city.name,
              id: res[1].city.id,
            });
            return concat([
              WeatherActions.updateWeather({ weather }),
              WeatherActions.updateForecast({ forecast }),
              WeatherActions.successLoadWeather({
                status: 'success to load the weather',
                cityDetails: { name: res[0].name, id: res[0].id },
              }),
            ]);
          }),
          catchError(() => {
            this.notifService.sendNotifEvent.emit({
              message: 'City not found',
              status: 404,
              type: 'error',
            });
            return of(WeatherActions.errorLoadWeather({ error: 'error to load the weather' }));
          }),
        );
      }),
    );
  });

  loadGeoWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.loadGeoWeather),
      switchMap((action) => {
        const firstPossibleMinute =
          +Math.round(Date.now() / numbers.millisecondsInMinute) - numbers.minutesInThreeHours;
        const possibleMinutesArray = Array(numbers.minutesInThreeHours)
          .fill(firstPossibleMinute)
          .map((v: number = firstPossibleMinute, i = 0) => v + i);
        if (
          cache.has(action.lat + action.lon) &&
          possibleMinutesArray.includes(
            Math.round(Date.parse(cache.get(action.lat + action.lon)[1].list[0].dt_txt) / numbers.millisecondsInMinute),
          )
        ) {
          const dataCache = cache.get(action.lat + action.lon);
          const weather = WeatherHelper.buildWeather(dataCache[0]);
          const forecast = WeatherHelper.buildForcastByDay(dataCache[1].list, {
            name: dataCache[1].city.name,
            id: dataCache[1].city.id,
          });
          return concat([
            WeatherActions.updateWeather({ weather }),
            WeatherActions.updateForecast({ forecast }),
            WeatherActions.successLoadWeather({
              status: 'success to load the weather',
              cityDetails: { name: dataCache[0].name, id: dataCache[0].id },
            }),
          ]);
        }
        return forkJoin(
          this.apiService.getWeatherGeo(action.lon, action.lat),
          this.apiService.getForecastGeo(action.lon, action.lat),
        ).pipe(
          switchMap((res) => {
            cache.set(action.lat + action.lon, res);
            const weather = WeatherHelper.buildWeather(res[0]);
            const forecast = WeatherHelper.buildForcastByDay(res[1].list, {
              name: res[1].city.name,
              id: res[1].city.id,
            });
            return concat([
              WeatherActions.updateWeather({ weather }),
              WeatherActions.updateForecast({ forecast }),
              WeatherActions.successLoadWeather({
                status: 'success to load the weather',
                cityDetails: { name: res[0].name, id: res[0].id },
              }),
            ]);
          }),
          catchError(() => {
            this.notifService.sendNotifEvent.emit({
              message: 'City not found',
              status: 404,
              type: 'error',
            });
            return of(WeatherActions.errorLoadWeather({ error: 'error to load the weather' }));
          }),
        );
      }),
    );
  });

  loadGeoWeatherStorm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.loadGeoWeatherStorm),
      switchMap((action) => {
        const firstPossibleMinute =
          +Math.round(Date.now() / numbers.millisecondsInMinute) - numbers.minutesInThreeHours;
        const possibleMinutesArray = Array(numbers.minutesInThreeHours)
          .fill(firstPossibleMinute)
          .map((v: number = firstPossibleMinute, i = 0) => v + i);
        if (
          cache.has(action.lat + action.lon + 1) &&
          possibleMinutesArray.includes(
            Math.round(Date.parse(cache.get(action.lat + action.lon)[1].list[0].dt_txt) / numbers.millisecondsInMinute),
          )
        ) {
          const dataCache = cache.get(action.lat + action.lon + 1);
          const weather = WeatherHelper.buildWeatherStorm(dataCache);
          const forecast = WeatherHelper.buildForcastByDayStorm(dataCache.hours);
          return concat([
            WeatherActions.updateWeather({ weather }),
            WeatherActions.updateForecast({ forecast }),
            WeatherActions.successLoadWeather({
              status: 'success to load the weather',
              cityDetails: { name: '', id: 0 },
            }),
          ]);
        }
        return this.apiService.getWeatherGeoStorm(action.lon, action.lat).pipe(
          switchMap((res) => {
            cache.set(action.lat + action.lon + 1, res);
            const weather = WeatherHelper.buildWeatherStorm(res);
            const forecast = WeatherHelper.buildForcastByDayStorm(res.hours);
            return concat([
              WeatherActions.updateWeather({ weather }),
              WeatherActions.updateForecast({ forecast }),
              WeatherActions.successLoadWeather({
                status: 'success to load the weather',
                cityDetails: { name: '', id: 0 },
              }),
            ]);
          }),
          catchError(() => {
            this.notifService.sendNotifEvent.emit({
              message: 'City not found',
              status: 404,
              type: 'error',
            });
            return of(WeatherActions.errorLoadWeather({ error: 'error to load the weather' }));
          }),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private apiService: ApiService, private notifService: NotificationService) {}
}
