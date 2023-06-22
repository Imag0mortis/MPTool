import { TestBed } from '@angular/core/testing';

import { RealBidService } from './real-bid.service';

describe('RealBidService', () => {
  let service: RealBidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealBidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
