import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../viewing.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.css' ]
})

export class MessagesComponent implements OnInit {
  constructor(public viewService: ViewingService) { }

  ngOnInit(): void { }

  /**
   * Swap between message viewing styles styles
   */
  toggleViewStyle() {
    this.viewService.isCardView = this.viewService.isCardView === false;
  }

}
