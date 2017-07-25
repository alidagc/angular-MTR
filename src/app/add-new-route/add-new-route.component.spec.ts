import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRouteComponent } from './add-new-route.component';

describe('AddNewRouteComponent', () => {
  let component: AddNewRouteComponent;
  let fixture: ComponentFixture<AddNewRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
