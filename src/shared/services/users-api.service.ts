import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { UserModel } from "../../common/card/models/user.model";
import { userData } from "../users-data";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { UsersUtils } from "../users.utils";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(
    private readonly matSnackBar: MatSnackBar,
  ) { }

  public getUsers(): Observable<UserModel[]> {
    return this.getRandomSuccess().pipe(
      catchError(() => {
        return this.matSnackBar.open("We can't get all users for you, try again", 'Try again').afterDismissed().pipe(
          switchMap(() => this.getUsers()),
        );
      }),
      map(() => userData),
    );
  }

  public updateEvaluation(userId: number, evaluation: boolean): Observable<void> {
    return this.getRandomSuccess().pipe(
      tap(
        () => UsersUtils.updateEvaluations(userId, evaluation),
        () => this.matSnackBar.open("We can't update your evaluation of this user, try again", '', { duration: 3000 }),
      ),
    );
  }

  private getRandomSuccess(): Observable<any> {
    if (Number(Math.random().toFixed(1)) > 0.3) {
      return of([]);
    } else {
      return throwError({});
    }
  }
}
