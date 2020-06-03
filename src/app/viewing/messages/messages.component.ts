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
  constructor(private viewingService: ViewingService) {}

  ngOnInit(): void {
    this.userMsgData = this.viewingService.userMsgData;
  }

  toggleViewStyle() {
    this.isCardView = this.isCardView === false ? true : false;
  }

}
