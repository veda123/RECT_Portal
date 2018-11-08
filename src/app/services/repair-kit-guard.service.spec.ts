import { TestBed, inject } from '@angular/core/testing';

import { RepairKitGuard } from './repair-kit-guard.service';

describe('RepairKitGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepairKitGuard]
    });
  });

  it('should be created', inject([RepairKitGuard], (service: RepairKitGuard) => {
    expect(service).toBeTruthy();
  }));
});
