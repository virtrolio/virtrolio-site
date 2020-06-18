import { TestBed } from '@angular/core/testing';

import { LinkGenService } from './link-gen.service';

describe('LinkGenService', () => {
  let service: LinkGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
