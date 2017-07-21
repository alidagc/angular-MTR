import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackActiveMapComponent } from './back-active-map.component';

describe('BackActiveMapComponent', () => {
  let component: BackActiveMapComponent;
  let fixture: ComponentFixture<BackActiveMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackActiveMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackActiveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
