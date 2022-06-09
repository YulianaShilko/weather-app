/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Component, EventEmitter, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../../services/notifications.service';
import { Coordination } from '../../interfaces/general';
import { DialogServiceChoiceComponent } from '../../shared/dialogs/dialog-service-choice/dialog-service-choice.component';

export interface SelectDialogData {
  selectedWeatherService: string;
  weatherServices: string[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @ViewChild('f') public form!: NgForm;

  @Output() public searchEvent = new EventEmitter<string>();
  @Output() public searchGeoEvent = new EventEmitter<{ coord: Coordination; service: string }>();
  public city = '';
  public selectedWeatherService = '';
  public weatherServices: string[] = ['stormGlassService', 'openWeatherService'];
  public weatherServiceData = new BehaviorSubject('default');

  constructor(private notifService: NotificationService, public dialog: MatDialog) {}
  public openDialog(): void {
    const dialogWindow = this.dialog.open(DialogServiceChoiceComponent, {
      width: '250px',
      data: { weatherService: this.selectedWeatherService, weatherServices: this.weatherServices },
    });

    dialogWindow.afterClosed().subscribe((result: string) => this.weatherServiceData.next(result));
  }

  public search(): void {
    if (this.city === '') {
      return;
    }
    this.searchEvent.emit(this.city);
    this.city = '';
    this.form.reset();
  }

  public geo(): void {
    this.form.reset();
    this.openDialog();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.weatherServiceData.subscribe((result) => {
              this.searchGeoEvent.emit({
                coord: {
                  lon: position.coords.longitude,
                  lat: position.coords.latitude,
                },
                service: result,
              });
            });
          }
        },
        () => {
          this.notifService.sendNotifEvent.emit({
            message: 'Need permission to use the geolocalization',
            type: 'primary',
          });
        },
      );
    } else if (!navigator.geolocation) {
      this.notifService.sendNotifEvent.emit({
        message: "The geolocalization does'nt work in your browser",
        type: 'primary',
      });
    }
  }
}
