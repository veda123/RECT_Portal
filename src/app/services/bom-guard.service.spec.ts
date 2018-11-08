import { TestBed, inject } from '@angular/core/testing';

import { BomGuard } from './bom-guard.service';

describe('BomGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BomGuard]
    });
  });

  it('should be created', inject([BomGuard], (service: BomGuard) => {
    expect(service).toBeTruthy();
  }));
});
