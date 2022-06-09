import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OpenToDoService } from 'src/app/services/openToDo.service';
import { Weather } from '../../../../interfaces/general';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.scss'],
})
export class ForecastItemComponent implements OnInit {
  @Input() weather!: Weather;
  @Input() degresType = 'celsius';

  public symbol!: string;
  constructor(private openTodoService: OpenToDoService) {}

  public ngOnInit(): void {
    this.symbol = this.degresType === 'celsius' ? '&#176;' : '&#8457;';
  }

  public showToDo(): void {
    this.openTodoService.shareDateEvent(this.weather.date);
  }
}
