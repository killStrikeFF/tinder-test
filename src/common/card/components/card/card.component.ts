import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CardService } from "./services/card.service";
import { Observable } from "rxjs";
import { UserModel } from "../../models/user.model";
import { tap } from "rxjs/operators";

@Component({
  selector: 'tndr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [ CardService ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  public currentUser$: Observable<UserModel> = this.cardService.currentUser$.pipe(
    tap(res => this.cdr.detectChanges())
  );

  constructor(
    private readonly cardService: CardService,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  public updateEvaluation(evaluation: boolean): void {
    this.cardService.updateEvaluationOfCurrentUser(evaluation);
  }
}
