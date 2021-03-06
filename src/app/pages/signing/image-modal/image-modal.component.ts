import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';
import { SigningService } from '../../../core/signing.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
})
export class ImageModalComponent implements OnInit {
  public static readonly MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MiB in bytes

  public static readonly ACCEPTED_FILE_TYPES = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/tif',
    'image/tiff',
    'image/bmp',
    'image/gif',
    'image/jfif',
    'image/pjp',
  ];

  modalRef: BsModalRef;

  @ViewChild(ErrorAlertComponent) ErrorAlertComponent: ErrorAlertComponent;
  @ViewChild('imageModal', { static: false }) imageModal: ModalDirective;
  @ViewChild('imgUploadInput') imgUploadInput: ElementRef;

  constructor(public signingService: SigningService) {}

  ngOnInit(): void {}

  showImageModal(): void {
    this.imageModal.show();
  }

  hideImageModal(): void {
    this.imageModal.hide();
  }

  onClearImages(): void {
    this.signingService.images = [];
    this.signingService.imageURLs = [];
    this.imgUploadInput.nativeElement.value = '';
  }

  onSelectFiles(e: Event): void {
    const eventTarget = e.target as HTMLInputElement;
    const files = Array.from(eventTarget.files);

    if (files.length + this.signingService.imageURLs.length > 3) {
      this.ErrorAlertComponent.addImageCountLimit();
      return;
    }

    if (files) {
      for (const item of files) {
        // Error handling for files over 8MiB
        if (item.size > ImageModalComponent.MAX_FILE_SIZE) {
          this.ErrorAlertComponent.addImageSizeLimit(item.name);
          return;
        }

        // Error handling for unsupported file types
        if (ImageModalComponent.ACCEPTED_FILE_TYPES.indexOf(item.type) === -1) {
          this.ErrorAlertComponent.addUnsupportedFileType(item.name);
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = (event: ProgressEvent<FileReader>) => {
          const stringURL = event.target.result.toString();
          this.signingService.imageURLs.push(stringURL);
        };
        this.signingService.images.push(item);
      }
    }
  }
}
