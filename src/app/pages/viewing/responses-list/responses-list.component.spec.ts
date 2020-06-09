import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesListComponent } from './responses-list.component';

describe('ResponsesListComponent', () => {
  let component: ResponsesListComponent;
  let fixture: ComponentFixture<ResponsesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
