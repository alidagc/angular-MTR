import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDetailAndEditComponent } from './route-detail-and-edit.component';

describe('RouteDetailAndEditComponent', () => {
  let component: RouteDetailAndEditComponent;
  let fixture: ComponentFixture<RouteDetailAndEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteDetailAndEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDetailAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
