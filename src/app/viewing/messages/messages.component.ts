import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../../core/viewing.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.css' ]
})

export class MessagesComponent implements OnInit {
  userMsgData;

  constructor(public viewingService: ViewingService) { }

  ngOnInit(): void {
    this.userMsgData = this.viewingService.userMsgData;
  }

  toggleViewStyle() {
    this.viewingService.isCardView = this.viewingService.isCardView === false;
  }

}
