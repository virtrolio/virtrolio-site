import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineImagesComponent } from './inline-images.component';

describe('InlineImagesComponent', () => {
  let component: InlineImagesComponent;
  let fixture: ComponentFixture<InlineImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
