import { Component, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
})
export class ImageModalComponent {
  static maxFileSize = 8 * 1024 * 1024; // 8 MiB in bytes

  modalRef: BsModalRef;
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
      for (const item of files) {
        if (item.size > ImageModalComponent.maxFileSize) {
          this.ErrorAlertComponent.addImageSizeLimit(item.name);
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = (event: ProgressEvent<FileReader>) => {
          this.selectedImagesURLs.push(event.target.result);
        };
      }
    }
  }
}
