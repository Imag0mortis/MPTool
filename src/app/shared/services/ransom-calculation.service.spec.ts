import { TestBed } from '@angular/core/testing';

import { RansomCalculationService } from './ransom-calculation.service';

describe('RansomCalculationService', () => {
  let service: RansomCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RansomCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
