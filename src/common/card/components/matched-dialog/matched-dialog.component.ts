import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'tndr-matched-dialog',
  templateUrl: './matched-dialog.component.html',
  styleUrls: ['./matched-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchedDialogComponent {

  constructor(
    private readonly matDialogRef: MatDialogRef<MatchedDialogComponent>
  ) { }

  public closeDialog(): void {
    this.matDialogRef.close();
  }
}
