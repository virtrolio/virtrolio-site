import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../viewing.service';
import { AuthService } from '../../../core/auth.service';
import { FontService } from '../../../core/font.service';
import { Fonts } from '../../../shared/interfaces';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.css' ]
})

export class MessagesComponent implements OnInit {
  fonts: Fonts;
  messageToDelete: string;
  constructor(public viewService: ViewingService, public authService: AuthService) { }

  ngOnInit(): void {
    this.fonts = FontService.fonts;
    this.viewService.nowMillis = Timestamp.now().toMillis();
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
    // noinspection JSIgnoredPromiseFromCall
    this.viewService.msgIo.deleteMessage(this.messageToDelete).then(() => {
      // TODO: Add a toast on successful deletion
    }).catch(e => {
      // TODO: Add something here
    });
  }

  /**
   * Swap between message viewing styles
   */
  toggleViewStyle() {
    this.viewService.isCarouselView = this.viewService.isCarouselView === false;
  }

}
