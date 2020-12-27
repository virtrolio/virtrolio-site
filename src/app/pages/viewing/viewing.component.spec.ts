import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewingComponent } from './viewing.component';

describe('ViewingComponent', () => {
  let component: ViewingComponent;
  let fixture: ComponentFixture<ViewingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewingComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
