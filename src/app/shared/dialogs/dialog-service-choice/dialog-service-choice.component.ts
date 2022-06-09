import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectDialogData } from 'src/app/home/search/search.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dialog-service-choice',
  templateUrl: './dialog-service-choice.component.html',
  styleUrls: ['./dialog-service-choice.component.scss'],
})
export class DialogServiceChoiceComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogServiceChoiceComponent>,
    public selectWeatherServiceDialogRef: MatDialogRef<DialogServiceChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: SelectDialogData,
  ) {}

  public onCancelDialog(): void {
    this.selectWeatherServiceDialogRef.close();
  }
}
