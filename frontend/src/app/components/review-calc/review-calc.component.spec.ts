import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCalcComponent } from './review-calc.component';

describe('ReviewCalcComponent', () => {
  let component: ReviewCalcComponent;
  let fixture: ComponentFixture<ReviewCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
