import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";
import { UserModel } from "../../../models/user.model";
import { UsersApiService } from "../../../../../shared/services/users-api.service";
import { switchMap, tap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { MatchedDialogComponent } from "../../matched-dialog/matched-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class CardService {

  public get currentUser$(): Observable<UserModel> {
    return this._currentUser.asObservable();
  }

  private _currentUser = new BehaviorSubject<UserModel>(null);
  private _currentUserIndex;
  private _users: UserModel[];

  constructor(
    private readonly usersApiService: UsersApiService,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
  ) {
    this.initUsers().subscribe();
  }

  public updateEvaluationOfCurrentUser(evaluation: boolean): void {
    this.usersApiService.updateEvaluation(this._currentUser.value.id, evaluation).pipe(
      switchMap(() => {
        const gotMatched = this._currentUser.value.likeCurrentUser && evaluation;
        return gotMatched ? this.openMatchedDialog() : of([]);
      })
    ).subscribe(() => this.updateCurrentUser());
  }

  private initUsers(): Observable<UserModel[]> {
    return this.usersApiService.getUsers().pipe(
      tap(users => {
        this._users = users;
        this._currentUser.next(this._users[0]);
        this._currentUserIndex = 0;
      })
    );
  }

  private updateCurrentUser(): void {
    this._currentUserIndex++;

    if (this._currentUserIndex >= this._users.length) {
      this.matSnackBar.open('Users are over, load new ones?', 'Load')
        .afterDismissed().pipe(
          switchMap(() => this.initUsers())
        ).subscribe();
    } else {
      this._currentUser.next(this._users[this._currentUserIndex]);
    }
  }

  private openMatchedDialog(): Observable<boolean> {
    return this.matDialog.open(MatchedDialogComponent).afterClosed();
  }
}
