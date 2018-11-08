import { TestBed, inject } from '@angular/core/testing';

import { LocationCapGuard } from './location-cap-guard.service';

describe('LocationCapGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationCapGuard]
    });
  });

  it('should be created', inject([LocationCapGuard], (service: LocationCapGuard) => {
    expect(service).toBeTruthy();
  }));
});
