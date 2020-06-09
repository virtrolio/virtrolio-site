import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtrolioCoverComponent } from './virtrolio-cover.component';

describe('VirtrolioCoverComponent', () => {
  let component: VirtrolioCoverComponent;
  let fixture: ComponentFixture<VirtrolioCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtrolioCoverComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtrolioCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
