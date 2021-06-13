import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ViewingService } from '../../../core/viewing.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @ViewChild('imageModal') imageModalTemplate: TemplateRef<any>;
  // modalRef: BsModalRef;

  constructor(public activeModal: NgbActiveModal, public viewService: ViewingService) { }

  ngOnInit(): void {

  }

}
