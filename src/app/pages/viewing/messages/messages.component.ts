import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../viewing.service';
import { AuthService } from '../../../core/auth.service';
import { FontService } from '../../../core/font.service';
import { Fonts } from '../../../shared/interfaces';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.css' ]
})

export class MessagesComponent implements OnInit {
  fonts: Fonts;
  constructor(public viewService: ViewingService, public authService: AuthService, public fontService: FontService) { }

  ngOnInit(): void {
    this.fonts = FontService.fonts;
  }

  /**
   * Swap between message viewing styles styles
   */
  toggleViewStyle() {
    this.viewService.isCarouselView = this.viewService.isCarouselView === false;
  }

}
