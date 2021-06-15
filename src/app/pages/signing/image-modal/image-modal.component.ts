import { Component, ViewChild } from '@angular/core';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
})
export class ImageModalComponent {
  modalRef: BsModalRef;
  static maxFileSize = 8 * 1000000; // 8 MB in bytes

  selectedImages: File[] = [];
  selectedImagesURLs = [];

  @ViewChild(ErrorAlertComponent) ErrorAlertComponent: ErrorAlertComponent;
  @ViewChild('imageModal', { static: false }) imageModal: ModalDirective;

  constructor() {}

  showImageModal(): void {
    this.imageModal.show();
  }

  hideImageModal(): void {
    this.imageModal.hide();
  }

  onSelectFiles(e) {
    const files = e.target.files;

    if (files.length + this.selectedImagesURLs.length > 3) {
      this.ErrorAlertComponent.addImageCountLimit();
      return;
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > ImageModalComponent.maxFileSize) {
          this.ErrorAlertComponent.addImageSizeLimit(files[i].name);
          return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (event: any) => {
          this.selectedImagesURLs.push(event.target.result);
        };
      }
    }
  }
}
