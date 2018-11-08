import { TestBed, inject } from '@angular/core/testing';

import { LocationCapabilityService } from './location-capability.service';

describe('LocationCapabilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationCapabilityService]
    });
  });

  it('should be created', inject([LocationCapabilityService], (service: LocationCapabilityService) => {
    expect(service).toBeTruthy();
  }));
});
