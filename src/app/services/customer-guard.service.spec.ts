import { TestBed, inject } from '@angular/core/testing';

import { CustomerGuard } from './customer-guard.service';

describe('CustomerGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerGuard]
    });
  });

  it('should be created', inject([CustomerGuard], (service: CustomerGuard) => {
    expect(service).toBeTruthy();
  }));
});
