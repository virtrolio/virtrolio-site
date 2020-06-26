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
  nowMillis: number;
  constructor(public viewService: ViewingService, public authService: AuthService) { }

  ngOnInit(): void {
    this.fonts = FontService.fonts;
    this.nowMillis = Timestamp.now().toMillis();
  }

  /**
   * Format the timestamp depending on how much time as elapsed
   * @param nowMillis time in milliseconds upon ngOnInit()
   * @param millis message Timestamp in milliseconds
   * @param date message Timestamp as a date
   */
  timeSince(nowMillis: number, millis: number, date: string) {
    const secondsPast = (nowMillis - millis) / 1000;
    if (secondsPast < 60) {
      return Math.round(secondsPast).toString() + 's ago';
    }
    if (secondsPast < 3600) {
      return (Math.round(secondsPast / 60)).toString() + 'm ago';
    }
    if (secondsPast < 86400) {
      return (Math.round(secondsPast / 3600)).toString() + 'h ago';
    }
    if (secondsPast <= 604800) {
      return (Math.round(secondsPast / 86400)).toString() + ' days ago';
    }
    if (secondsPast > 604800) {
      // Return the full date if the Timestamp is past a week ago
      return date;
    }
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
