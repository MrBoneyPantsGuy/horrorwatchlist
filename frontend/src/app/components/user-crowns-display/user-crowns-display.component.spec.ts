import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCrownsDisplayComponent } from './user-crowns-display.component';

describe('UserCrownsDisplayComponent', () => {
  let component: UserCrownsDisplayComponent;
  let fixture: ComponentFixture<UserCrownsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCrownsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCrownsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
