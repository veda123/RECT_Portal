import { TestBed, inject } from '@angular/core/testing';

import { LocationPocService } from './location-poc.service';

describe('LocationPocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationPocService]
    });
  });

  it('should be created', inject([LocationPocService], (service: LocationPocService) => {
    expect(service).toBeTruthy();
  }));
});
