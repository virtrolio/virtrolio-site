import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFooterComponent } from './image-footer.component';

describe('ImageFooterComponent', () => {
  let component: ImageFooterComponent;
  let fixture: ComponentFixture<ImageFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
