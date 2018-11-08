import { TestBed, inject } from '@angular/core/testing';

import { TpsService } from './tps.service';

describe('TpsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TpsService]
    });
  });

  it('should be created', inject([TpsService], (service: TpsService) => {
    expect(service).toBeTruthy();
  }));
});
