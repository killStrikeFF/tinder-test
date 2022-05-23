import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedDialogComponent } from './matched-dialog.component';
import { Observable } from "rxjs";
import { MatDialogRef } from "@angular/material/dialog";

describe('MatchedDialogComponent', () => {
  let component: MatchedDialogComponent;
  let fixture: ComponentFixture<MatchedDialogComponent>;

  const matDialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: matDialogMock },
      ],
      declarations: [ MatchedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
