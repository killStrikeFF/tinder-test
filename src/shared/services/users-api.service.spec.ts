import { TestBed } from '@angular/core/testing';
import { UsersApiService } from "./users-api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsersUtils } from "../users.utils";
import { userData } from "../users-data";
import { Observable } from "rxjs";

describe('UsersApiService', () => {
  let service: UsersApiService;

  const matSnackBarMock = {
    open: () => {
      return {
        afterDismissed: () => new Observable(subscriber => subscriber.next(null)),
      }
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: matSnackBarMock },
        UsersApiService,
      ]
    });
    service = TestBed.inject(UsersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers', (done) => {
    service.getUsers().subscribe(response => expect(response).toEqual(userData));
    done();
  });

  it('updateEvaluation', (done) => {
    const spyUsersUtilsUpdateEvaluations = spyOn(UsersUtils, 'updateEvaluations');
    const spySnackBarOpen = spyOn(matSnackBarMock, 'open');

    service.updateEvaluation(1, true).subscribe(
      () => expect(spyUsersUtilsUpdateEvaluations.calls.count()).toEqual(1),
      () => expect(spySnackBarOpen.calls.count()).toEqual(1)
    );

    done();
  });

  it('getRandomSuccess', (done) => {
    service['getRandomSuccess']().subscribe(
      (response) => {
        expect(Array.isArray(response)).toEqual(true);
        expect(response.length).toEqual(0);
      },
      (err) => expect(err).toEqual({}),
    );

    done();
  });
});
