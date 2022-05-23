import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CardComponent } from "../common/card/components/card/card.component";
import { UsersApiService } from "../shared/services/users-api.service";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { userData } from "../shared/users-data";

describe('AppComponent', () => {

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CardComponent,
      ],
      providers: [
        { provide: UsersApiService, useValue: usersApiServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: MatSnackBar, useValue: matSnackBarMock },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-wrapper h1')?.textContent).toContain('Tinder-Like application');
  });
});
