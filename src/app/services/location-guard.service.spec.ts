import { TestBed, inject } from '@angular/core/testing';

import { LocationGuard } from './location-guard.service';

describe('LocationGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationGuard]
    });
  });

  it('should be created', inject([LocationGuard], (service: LocationGuard) => {
    expect(service).toBeTruthy();
  }));
});
