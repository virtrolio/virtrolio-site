import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendLinkComponent } from './friend-link.component';

describe('FriendLinkComponent', () => {
  let component: FriendLinkComponent;
  let fixture: ComponentFixture<FriendLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendLinkComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
