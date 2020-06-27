import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourVirtrolioComponent } from './your-virtrolio.component';

describe('VirtrolioCoverComponent', () => {
  let component: YourVirtrolioComponent;
  let fixture: ComponentFixture<YourVirtrolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourVirtrolioComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourVirtrolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
