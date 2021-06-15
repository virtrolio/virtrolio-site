import { TestBed } from '@angular/core/testing';

import { ViewingService } from './viewing.service';

describe('ViewingService', () => {
  let service: ViewingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
