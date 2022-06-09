import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OpenToDoService } from 'src/app/services/openToDo.service';
import { Weather } from '../../../interfaces/general';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.scss'],
})
export class WeatherCurrentComponent implements OnInit {
  @Input() degresType = 'celsius';
  @Input() weather!: Weather;
  public symbol!: string;

  constructor(private openTodoService: OpenToDoService) {}

  public ngOnInit(): void {
    this.symbol = this.degresType === 'celsius' ? '&#176;' : '&#8457;';
  }

  public showToDo(): void {
    this.openTodoService.shareDateEvent(this.weather.date);
  }
}
