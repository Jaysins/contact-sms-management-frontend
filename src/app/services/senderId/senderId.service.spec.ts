import { TestBed } from '@angular/core/testing';

import { SenderIdService } from './senderId.service';

describe('SenderIdService', () => {
  let service: SenderIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenderIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
