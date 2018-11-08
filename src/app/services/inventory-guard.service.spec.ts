import { TestBed, inject } from '@angular/core/testing';

import { InventoryGuard } from './inventory-guard.service';

describe('InventoryGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryGuard]
    });
  });

  it('should be created', inject([InventoryGuard], (service: InventoryGuard) => {
    expect(service).toBeTruthy();
  }));
});
