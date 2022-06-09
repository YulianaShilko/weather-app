import { createReducer, on } from '@ngrx/store';
import { initialGeneralState } from '../interfaces/general';
import { WeatherActions } from './general.actions';

export const generalFeatureKey = 'general';

export const generalReducer = createReducer(
  initialGeneralState,

  on(WeatherActions.loadWeather, (state, action) => {
    return {
      ...state,
      currentCity: { name: action.town, id: -1 },
      isShown: false,
      isLoading: true,
    };
  }),
  on(WeatherActions.loadGeoWeather, (state) => {
    return {
      ...state,
      currentCity: { name: '', id: -1 },
      isShown: false,
      isLoading: true,
    };
  }),
  on(WeatherActions.loadGeoWeatherStorm, (state) => {
    return {
      ...state,
      currentCity: { name: '', id: -1 },
      isShown: false,
      isLoading: true,
    };
  }),
  on(WeatherActions.successLoadWeather, (state, action) => {
    return {
      ...state,
      currentCity: action.cityDetails,
      isShown: true,
      isLoading: false,
      status: action.status,
    };
  }),
  on(WeatherActions.errorLoadWeather, (state, action) => {
    return {
      ...state,
      currentCity: null,
      isShown: false,
      isLoading: false,
      status: action.error,
    };
  }),
  on(WeatherActions.updateWeather, (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        weather: action.weather,
      },
    };
  }),
  on(WeatherActions.updateForecast, (state, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        forecast: action.forecast,
      },
    };
  }),
);
