import { Component, OnInit } from '@angular/core';

import { ViewingService } from '../../core/viewing.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  isCardView: boolean = false;
  userMsgData;
  constructor(private viewingService: ViewingService) { 
    this.userMsgData = viewingService.userMsgData;
  }

  ngOnInit(): void {
  }

  toggleViewStyle() {
    this.isCardView = this.isCardView === false ? true : false;
  }

}
