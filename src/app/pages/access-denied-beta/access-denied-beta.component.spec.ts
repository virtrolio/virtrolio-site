import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccessDeniedBetaComponent } from './access-denied-beta.component';

describe('AccessDeniedBetaComponent', () => {
  let component: AccessDeniedBetaComponent;
  let fixture: ComponentFixture<AccessDeniedBetaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessDeniedBetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDeniedBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
