import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../../../core/viewing.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css'],
})
export class MessageModalComponent implements OnInit {
  constructor(
    public viewService: ViewingService,
    public modalService: BsModalService
  ) {}

  ngOnInit(): void {}
}
