import { TestBed, inject } from '@angular/core/testing';

import { RepairToolsService } from './repair-tools.service';

describe('RepairToolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepairToolsService]
    });
  });

  it('should be created', inject([RepairToolsService], (service: RepairToolsService) => {
    expect(service).toBeTruthy();
  }));
});
