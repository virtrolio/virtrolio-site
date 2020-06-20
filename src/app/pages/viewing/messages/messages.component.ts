import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../../../pages/viewing/viewing.service';
import { VirtrolioMessage } from '../../../shared/interfaces';
import { MsgIoService } from '../../../core/msg-io.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.css' ]
})

export class MessagesComponent implements OnInit {
  constructor(public viewService: ViewingService) { }

  ngOnInit(): void { }

  toggleViewStyle() {
    this.viewService.isCardView = this.viewService.isCardView === false;
  }

}
