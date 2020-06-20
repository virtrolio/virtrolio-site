import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../../../core/viewing.service';
import { VirtrolioMessage } from '../../../shared/interfaces';
import { MsgIoService } from '../../../core/msg-io.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.css' ]
})

export class MessagesComponent implements OnInit {
  messages: VirtrolioMessage[];
  constructor(public viewingService: ViewingService, private msgio: MsgIoService) {
    this.msgio.getMessages().subscribe((msgData: VirtrolioMessage[]) => this.messages = msgData);
  }

  ngOnInit(): void { }

  toggleViewStyle() {
    this.viewingService.isCardView = this.viewingService.isCardView === false;
  }

}
