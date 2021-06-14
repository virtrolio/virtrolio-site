import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { InlineImagesComponent } from './components/inline-images/inline-images.component';

@NgModule({
  declarations: [InlineImagesComponent],
  imports: [AngularFireStorageModule, CommonModule],
  exports: [InlineImagesComponent],
})
export class SharedModule { }
