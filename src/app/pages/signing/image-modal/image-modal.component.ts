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

  selectedImagesNames: string[] = [];
  selectedImages: File[] = [];

  @ViewChild(ErrorAlertComponent) ErrorAlertComponent: ErrorAlertComponent;
  @ViewChild('imageModal', { static: false }) imageModal: ModalDirective;

  constructor(private modalService: BsModalService) {}

  showImageModal(): void {
    this.imageModal.show();
  }

  hideImageModal(): void {
    this.imageModal.hide();
  }

  fileNames(fileInput: any) {
    this.selectedImagesNames = [];
    this.selectedImages = [];

    if (fileInput.length > 3) {
      this.ErrorAlertComponent.addImageCountLimit();
      return;
    }
    for (const i in fileInput) {
      if (fileInput[i].size > 64000000) {
        this.ErrorAlertComponent.addImageSizeLimit(fileInput[i].name);
        continue;
      } else {
        this.selectedImagesNames.push(fileInput[i].name);
        this.selectedImages.push(fileInput[i]);
      }
    }
  }
}
