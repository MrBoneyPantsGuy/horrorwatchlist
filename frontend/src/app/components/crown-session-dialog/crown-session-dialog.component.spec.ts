import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrownSessionDialogComponent } from './crown-session-dialog.component';

describe('CrownSessionDialogComponent', () => {
  let component: CrownSessionDialogComponent;
  let fixture: ComponentFixture<CrownSessionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrownSessionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrownSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
