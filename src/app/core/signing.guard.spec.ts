import { TestBed } from '@angular/core/testing';

import { SigningGuard } from './signing.guard';

describe('SigningGuard', () => {
  let guard: SigningGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    guard = TestBed.inject(SigningGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
