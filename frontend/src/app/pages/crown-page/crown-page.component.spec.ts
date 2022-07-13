import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrownPageComponent } from './crown-page.component';

describe('CrownPageComponent', () => {
  let component: CrownPageComponent;
  let fixture: ComponentFixture<CrownPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrownPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
