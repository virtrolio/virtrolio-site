import { Component, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  modalRef: BsModalRef;

  @ViewChild('imageModal', { static: false }) imageModal: ModalDirective;

  constructor(private modalService: BsModalService) { }

  showImageModal(): void {
    this.imageModal.show();
  }

  hideImageModal(): void {
    this.imageModal.hide();
  }

  selectedImagesNames: String[] = [];
  selectedImages: File[] = [];

  fileNames(fileInput: any) {
    this.selectedImagesNames = [];
    this.selectedImages = [];

    for (var i in fileInput) {
      console.log(fileInput[i].name);
      this.selectedImagesNames.push(fileInput[i].name);
      this.selectedImages.push(fileInput[i]);
    }
  }
}
