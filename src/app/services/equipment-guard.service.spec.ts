import { TestBed, inject } from '@angular/core/testing';

import { EquipmentGuard } from './equipment-guard.service';

describe('EquipmentGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentGuard]
    });
  });

  it('should be created', inject([EquipmentGuard], (service: EquipmentGuard) => {
    expect(service).toBeTruthy();
  }));
});
