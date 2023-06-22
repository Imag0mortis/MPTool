import { TestBed } from '@angular/core/testing';

import { SelfransomService } from './selfransom.service';

describe('SelfransomService', () => {
  let service: SelfransomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfransomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
