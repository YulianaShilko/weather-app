import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CityDetails, Coordination, Weather, WeatherForecast } from '../interfaces/general';
import { WeatherService } from '../services/weather.service';
import { WeatherActions } from '../store/general.actions';
import { generalSelectors } from '../store/general.selector';
import { OpenToDoService } from '../services/openToDo.service';
import { TodoListService } from '../services/todo.service';
import { TodoItem } from '../interfaces/todo';

const DEFAULT_CITY = 'Minsk';

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public isShown = false;
  public isLoading = true;
  public currentCity: CityDetails | null = null;
  public weather!: Weather;
  public forecast!: WeatherForecast;
  public description!: string;
  public clickedDate!: string;
  public todoList!: TodoItem[];

  public subscriptionIsShown!: Subscription;
  public subscriptionIsLoading!: Subscription;
  public subscriptionCurrentCity!: Subscription;
  public subscriptionGeneralWeather!: Subscription;
  public subscriptionGeneralForecast!: Subscription;
  public subscriptionIsDateEvent!: Subscription;
  public subscriptionStartData!: Subscription;

  constructor(
    private store: Store,
    private weatherService: WeatherService,
    private openTodoService: OpenToDoService,
    private todoListService: TodoListService,
  ) {}

  public ngOnInit(): void {
    this.initSubscriptions();
    this.cityChange(DEFAULT_CITY);
  }

  public initSubscriptions(): void {
    this.subscriptionIsShown = this.weatherService.isShow$.subscribe((isShown: boolean) => (this.isShown = isShown));
    this.subscriptionIsLoading = this.weatherService.isLoading$.subscribe(
      (isLoading: boolean) => (this.isLoading = isLoading),
    );
    this.subscriptionCurrentCity = this.weatherService.currentCity$.subscribe(
      (currentCity: CityDetails | null) => (this.currentCity = currentCity),
    );
    this.subscriptionGeneralWeather = this.weatherService.generalWeather$.subscribe((generalWeather: Weather) => {
      this.weather = generalWeather;
    });
    this.subscriptionGeneralForecast = this.weatherService.generalForecast$.subscribe((generalForecast: any) => {
      this.forecast = generalForecast;
    });
    this.subscriptionIsDateEvent = this.openTodoService.dateEventListener().subscribe((key: string) => {
      this.todoList = this.todoListService.getTodoList(key);
      this.clickedDate = key;
    });
    this.subscriptionStartData = this.store
      .select(generalSelectors.weather)
      .subscribe((weather: Weather) => (this.description = weather.description));
  }

  public cityChange(town: string): void {
    this.store.dispatch(WeatherActions.loadWeather({ town }));
  }

  public geoChange(coordination: Coordination, service: string): void {
    if (service === 'openWeatherService') {
      this.store.dispatch(WeatherActions.loadGeoWeather(coordination));
    } else if (service === 'stormGlassService') {
      this.store.dispatch(WeatherActions.loadGeoWeatherStorm(coordination));
    }
  }

  public addItem(title: string): void {
    this.todoListService.addItem({ title }, this.clickedDate);
  }

  public deleteItem(todoItem: TodoItem): void {
    this.todoListService.deleteItem(todoItem, this.clickedDate);
  }

  public destroy(): void {
    this.subscriptionIsShown.unsubscribe();
    this.subscriptionIsLoading.unsubscribe();
    this.subscriptionCurrentCity.unsubscribe();
    this.subscriptionGeneralWeather.unsubscribe();
    this.subscriptionGeneralForecast.unsubscribe();
    this.subscriptionIsDateEvent.unsubscribe();
    this.subscriptionStartData.unsubscribe();
  }

  public ngOnDestroy(): void {
    this.destroy();
  }
}
