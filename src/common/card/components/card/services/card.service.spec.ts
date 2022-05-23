import { TestBed } from '@angular/core/testing';
import { CardService } from './card.service';
import { Observable } from "rxjs";
import { userData } from "../../../../../shared/users-data";
import { UsersApiService } from "../../../../../shared/services/users-api.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

describe('CardService', () => {
  let service: CardService;

  const usersApiServiceMock = {
    updateEvaluation: () => new Observable(subscriber => subscriber.next(null)),
    getUsers: () => new Observable(subscriber => subscriber.next(userData)),
  };

  const matDialogMock = {
    open: () => {
      return {
        afterClosed: () => new Observable(subscriber => subscriber.next(null)),
      }
    }
  };

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
        { provide: UsersApiService, useValue: usersApiServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: MatSnackBar, useValue: matSnackBarMock },
        CardService,
      ]
    });
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateEvaluationOfCurrentUser', () => {
    beforeEach(() => {
      service['_currentUser'].next(userData[1]);
      spyOn(service, 'openMatchedDialog' as never);
      spyOn(service, 'updateCurrentUser' as never);
    })

    it('should call openMatchedDialog if user and current user have been matching', () => {
      service.updateEvaluationOfCurrentUser(true);
      expect(service['openMatchedDialog']).toHaveBeenCalled();
    });

    it('should just update current user', () => {
      service.updateEvaluationOfCurrentUser(false);
      expect(service['updateCurrentUser']).toHaveBeenCalled();
    });
  });

  it('initUsers', (done) => {
    service['initUsers']().subscribe(users => {
      expect(service['_users']).toEqual(userData);
      expect(service['_currentUser'].value).toEqual(userData[0]);
      expect(service['_currentUserIndex']).toEqual(0);
    });
    done();
  });

  describe('updateCurrentUser', () => {
    it('should just update current user', () => {
      service['updateCurrentUser']();
      service.currentUser$.subscribe(currentUser => {
        expect(currentUser).toEqual(userData[1]);
      })
    });

    it('should load users again if current user is last of all users', () => {
      service['_currentUserIndex'] = 4;
      service['updateCurrentUser']();

      expect(service['_users']).toEqual(userData);
      expect(service['_currentUser'].value).toEqual(userData[0]);
      expect(service['_currentUserIndex']).toEqual(0);
    });
  });

  it('openMatchedDialog', (done) => {
    spyOn(matDialogMock, 'open' as never).and.returnValue({afterClosed: () => new Observable(subscriber => subscriber.next(null))} as never);

    service['openMatchedDialog']().subscribe(() => {
      expect(matDialogMock['open']).toHaveBeenCalled();
      done();
    });
  });
});
