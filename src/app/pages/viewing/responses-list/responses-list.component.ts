import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../../../core/viewing.service';
import { ViewportScroller } from '@angular/common';
import { AppAuthService } from '../../../core/app-auth.service';

@Component({
  selector: 'app-responses-list',
  templateUrl: './responses-list.component.html',
  styleUrls: [ './responses-list.component.css' ]
})
export class ResponsesListComponent implements OnInit {
  userMsgData;
  constructor(public viewingService: ViewingService, private vps: ViewportScroller, public authService: AppAuthService) {}

  ngOnInit(): void {
    this.userMsgData = this.viewingService.userMsgData;
  }

  showMessage(id) {
    this.viewingService.isCardView = true;
    this.vps.scrollToAnchor(id);
  }
}
