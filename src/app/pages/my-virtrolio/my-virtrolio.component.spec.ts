import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyVirtrolioComponent } from './my-virtrolio.component';

describe('VirtrolioCoverComponent', () => {
  let component: MyVirtrolioComponent;
  let fixture: ComponentFixture<MyVirtrolioComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MyVirtrolioComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVirtrolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
