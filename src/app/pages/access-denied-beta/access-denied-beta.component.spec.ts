import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedBetaComponent } from './access-denied-beta.component';

describe('AccessDeniedBetaComponent', () => {
  let component: AccessDeniedBetaComponent;
  let fixture: ComponentFixture<AccessDeniedBetaComponent>;

  beforeEach(async(() => {
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
