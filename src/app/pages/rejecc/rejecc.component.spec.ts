import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeccComponent } from './rejecc.component';

describe('RejeccComponent', () => {
  let component: RejeccComponent;
  let fixture: ComponentFixture<RejeccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejeccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
