import { Component, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { SigningService } from '../../../core/signing.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
})
export class ImageModalComponent {
  static maxFileSize = 8 * 1024 * 1024; // 8 MiB in bytes

  modalRef: BsModalRef;
  selectedImagesURLs = [];

  @ViewChild(ErrorAlertComponent) ErrorAlertComponent: ErrorAlertComponent;
  @ViewChild('imageModal', { static: false }) imageModal: ModalDirective;

  constructor(private signingService: SigningService) {}

  showImageModal(): void {
    this.imageModal.show();
  }

  hideImageModal(): void {
    this.imageModal.hide();
  }

  onClearImages(): void {
    this.signingService.images = [];
    this.selectedImagesURLs = [];
  }

  onSelectFiles(e: Event): void {
    const eventTarget = e.target as HTMLInputElement;
    const files = Array.from(eventTarget.files);

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
        this.signingService.images.push(item);
      }
    }
  }
}
