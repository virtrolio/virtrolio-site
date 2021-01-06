import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvalidLinkComponent } from './invalid-link.component';

describe('InvalidLinkComponent', () => {
  let component: InvalidLinkComponent;
  let fixture: ComponentFixture<InvalidLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
