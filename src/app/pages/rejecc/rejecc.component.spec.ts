import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RejeccComponent } from './rejecc.component';

describe('RejeccComponent', () => {
  let component: RejeccComponent;
  let fixture: ComponentFixture<RejeccComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RejeccComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RejeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
