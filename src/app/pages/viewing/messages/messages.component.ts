import { Component, OnInit, ViewChild } from '@angular/core';
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
  messageToDelete: string;

  constructor(public viewService: ViewingService, public authService: AuthService, public fontService: FontService) { }

  ngOnInit(): void {
    this.fonts = FontService.fonts;
  }

  /**
   * When you click 'x' on a message, messageToDelete will be assigned the value of that message's id
   * @param mID message id
   */
  setMessageToDelete(mID: string) {
    this.messageToDelete = mID;
  }

  /**
   * Wrapper around deleteMessage()
   */
  deleteMessage() {
    try {
      this.viewService.msgIo.deleteMessage(this.messageToDelete);
    } catch (e) { }
  }
  /**
   * Swap between message viewing styles styles
   */
  toggleViewStyle() {
    this.viewService.isCarouselView = this.viewService.isCarouselView === false;
  }

}
