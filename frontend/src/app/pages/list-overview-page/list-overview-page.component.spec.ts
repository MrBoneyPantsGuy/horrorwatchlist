import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOverviewPageComponent } from './list-overview-page.component';

describe('ListOverviewPageComponent', () => {
  let component: ListOverviewPageComponent;
  let fixture: ComponentFixture<ListOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOverviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
