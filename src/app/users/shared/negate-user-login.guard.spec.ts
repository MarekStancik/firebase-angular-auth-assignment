import { TestBed, async, inject } from '@angular/core/testing';

import { NegateUserLoginGuard } from './negate-user-login.guard';

describe('NegateUserLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NegateUserLoginGuard]
    });
  });

  it('should ...', inject([NegateUserLoginGuard], (guard: NegateUserLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
