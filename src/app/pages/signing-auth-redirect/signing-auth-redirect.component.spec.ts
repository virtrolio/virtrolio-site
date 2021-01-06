import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SigningAuthRedirectComponent } from './signing-auth-redirect.component';

describe('FriendLinkComponent', () => {
  let component: SigningAuthRedirectComponent;
  let fixture: ComponentFixture<SigningAuthRedirectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SigningAuthRedirectComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigningAuthRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
