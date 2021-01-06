import { TestBed } from '@angular/core/testing';

import { SharingLinkService } from './sharing-link.service';

describe('SharingLinkService', () => {
  let service: SharingLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    service = TestBed.inject(SharingLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
