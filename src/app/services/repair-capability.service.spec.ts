import { TestBed, inject } from '@angular/core/testing';

import { RepairCapabilityService } from './repair-capability.service';

describe('RepairCapabilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepairCapabilityService]
    });
  });

  it('should be created', inject([RepairCapabilityService], (service: RepairCapabilityService) => {
    expect(service).toBeTruthy();
  }));
});
