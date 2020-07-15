import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewingService } from '../../../core/viewing.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: [ './message-modal.component.css' ]
})
export class MessageModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public viewService: ViewingService) { }

  ngOnInit(): void {
  }

}
