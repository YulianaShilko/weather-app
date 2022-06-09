import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './home/search/search.component';
import { HomeComponent } from './home/home.component';
import { generalReducer } from '../app/store/general.reducer';
import { GeneralEffects } from '../app/store/general.effects';
import { environment } from '../environments/environment';
import { HomeWeatherComponent } from './home/home-weather/home-weather.component';
import { WeatherCurrentComponent } from './home/home-weather/weather-current/weather-current.component';
import { WeatherForecastComponent } from './home/home-weather/weather-forecast/weather-forecast.component';
import { ChangeClassNamePipe } from './shared/pipes/class-name.pipe';
import { ForecastItemComponent } from './home/home-weather/weather-forecast/forecast-item/forecast-item.component';
import { MaterialModule } from '../app/material/material.module';
import { DialogServiceChoiceComponent } from './shared/dialogs/dialog-service-choice/dialog-service-choice.component';
import { AddTodoItemComponent } from './home/add-todo-item/add-todo-item.component';
import { ChangeCelsiumPipe } from './shared/pipes/celsium.pipe';

@NgModule({
  declarations: [
    AddTodoItemComponent,
    AppComponent,
    ChangeCelsiumPipe,
    ChangeClassNamePipe,
    DialogServiceChoiceComponent,
    ForecastItemComponent,
    HomeComponent,
    HomeWeatherComponent,
    SearchComponent,
    WeatherCurrentComponent,
    WeatherForecastComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({ general: generalReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot([GeneralEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
