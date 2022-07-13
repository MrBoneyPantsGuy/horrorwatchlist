import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedCrownsComponent } from './stacked-crowns.component';

describe('StackedCrownsComponent', () => {
  let component: StackedCrownsComponent;
  let fixture: ComponentFixture<StackedCrownsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedCrownsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedCrownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
