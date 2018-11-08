import { TestBed, inject } from '@angular/core/testing';

import { DateInitService } from './date-init.service';

describe('DateInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateInitService]
    });
  });

  it('should be created', inject([DateInitService], (service: DateInitService) => {
    expect(service).toBeTruthy();
  }));
});
