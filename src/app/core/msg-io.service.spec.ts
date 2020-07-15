import { TestBed } from '@angular/core/testing';

import { MsgIoService } from './msg-io.service';

describe('MsgIoService', () => {
  let service: MsgIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    service = TestBed.inject(MsgIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
