import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomSelectionPageComponent } from './random-selection-page.component';

describe('RandomSelectionPageComponent', () => {
  let component: RandomSelectionPageComponent;
  let fixture: ComponentFixture<RandomSelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomSelectionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
