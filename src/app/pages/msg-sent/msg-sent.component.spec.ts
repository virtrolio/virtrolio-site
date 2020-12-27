import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MsgSentComponent } from './msg-sent.component';

describe('MsgSentComponent', () => {
  let component: MsgSentComponent;
  let fixture: ComponentFixture<MsgSentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgSentComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
