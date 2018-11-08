import { TestBed, inject } from '@angular/core/testing';

import { TpsGuard } from './tps-guard.service';

describe('TpsGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TpsGuard]
    });
  });

  it('should be created', inject([TpsGuard], (service: TpsGuard) => {
    expect(service).toBeTruthy();
  }));
});
