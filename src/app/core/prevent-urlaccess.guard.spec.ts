import { TestBed } from '@angular/core/testing';

import { PreventURLAccessGuard } from './prevent-urlaccess.guard';

describe('PreventURLAccessGuard', () => {
  let guard: PreventURLAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    guard = TestBed.inject(PreventURLAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
