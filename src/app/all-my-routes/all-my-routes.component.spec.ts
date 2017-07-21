import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRoutesComponent } from './all-my-routes.component';

describe('AllRoutesComponent', () => {
  let component: AllRoutesComponent;
  let fixture: ComponentFixture<AllRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
