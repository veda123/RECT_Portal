import { TestBed, inject } from '@angular/core/testing';

import { LocationPocGuard } from './location-poc-guard.service';

describe('LocationPocGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationPocGuard]
    });
  });

  it('should be created', inject([LocationPocGuard], (service: LocationPocGuard) => {
    expect(service).toBeTruthy();
  }));
});
