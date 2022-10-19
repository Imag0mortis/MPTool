import { TestBed } from '@angular/core/testing';

import { ScoreCorrectionService } from './score-correction.service';

describe('ScoreCorrectionService', () => {
  let service: ScoreCorrectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreCorrectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
