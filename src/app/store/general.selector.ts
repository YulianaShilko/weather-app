import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralState } from '../interfaces/general';
import { generalFeatureKey } from './general.reducer';

export const selectGeneralState = createFeatureSelector<GeneralState>(generalFeatureKey);

export const generalSelectors = {
  isShown: createSelector(selectGeneralState, (state) => state.isShown),
  isLoading: createSelector(selectGeneralState, (state) => state.isLoading),
  currentCity: createSelector(selectGeneralState, (state) => state.currentCity),
  weather: createSelector(selectGeneralState, (state) => state.data.weather),
  forecast: createSelector(selectGeneralState, (state) => state.data.forecast),
};
