import { TestBed, inject } from '@angular/core/testing';

import { MyTravelRoutesServiceService } from './my-travel-routes-service.service';

describe('MyTravelRoutesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTravelRoutesServiceService]
    });
  });

  it('should be created', inject([MyTravelRoutesServiceService], (service: MyTravelRoutesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
