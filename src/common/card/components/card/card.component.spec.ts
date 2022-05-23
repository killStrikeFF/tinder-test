import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { CardService } from "./services/card.service";
import { Observable } from "rxjs";
import { userData } from "../../../../shared/users-data";
import { ChangeDetectorRef } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { skip } from "rxjs/operators";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockCardService = {
    currentUser$: new Observable(subscriber => subscriber.next(userData[0])),
    updateEvaluationOfCurrentUser: (evaluation: boolean) => {},
  };

  const mockChangeDetectorRef = {
    detectChanges: () => {},
  };

  const matSnackBarMock = {
    open: () => {
      return {
        afterDismissed: () => new Observable(subscriber => subscriber.next(null)),
      }
    },
  };

  const matDialogMock = {
    open: () => {
      return {
        afterClosed: () => new Observable(subscriber => subscriber.next(null)),
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      providers: [
        { provide: CardService, useValue: mockCardService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
        { provide: MatSnackBar, useValue: matSnackBarMock },
        { provide: MatDialog, useValue: matDialogMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show first user in template', (done) => {
    component.currentUser$.pipe(
      skip(1)
    ).subscribe((user) => {
      expect(user).toEqual(userData[0]);
      done();
    });

    done();
  });
});
