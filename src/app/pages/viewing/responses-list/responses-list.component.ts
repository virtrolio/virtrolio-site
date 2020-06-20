import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../../../pages/viewing/viewing.service';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-responses-list',
  templateUrl: './responses-list.component.html',
  styleUrls: [ './responses-list.component.css' ]
})
export class ResponsesListComponent implements OnInit {

  constructor(public viewService: ViewingService, private vps: ViewportScroller, public authService: AuthService) {}

  ngOnInit(): void { }

  showMessage(id) {
    if (this.viewService.isCardView) {
      this.vps.scrollToAnchor(id);
    }
  }
}
