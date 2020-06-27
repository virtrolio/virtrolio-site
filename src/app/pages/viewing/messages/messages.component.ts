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
   * Generate the lightness value of HSL from RBG
   */
  getLightness(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    return l;
  }

  /**
   * Generate a darkened version of backColor, returning this new header color and the appropriate header text color
   * @param backColor: background color of the message
   */
  generateHeaderColor(backColor: string) {
    const bgR = parseInt(backColor.slice(1, 3), 16);
    const bgG = parseInt(backColor.slice(3, 5), 16);
    const bgB = parseInt(backColor.slice(5), 16);
    const hR = bgR + 20 > 255 ? 255 : bgR + 20;
    const hG = bgG + 20 > 255 ? 255 : bgG + 20;
    const hB = bgB + 20 > 255 ? 255 : bgB + 20;
    const headerColor = hR.toString(16) + hG.toString(16) + hB.toString(16);
    let headerTextColor;
    if (this.getLightness(hR, hG, hB) > 0.65) {
      headerTextColor = '#000000';
    } else {
      headerTextColor = '#FFFFFF';
    }
    return { bg: '#' + headerColor, text: headerTextColor };
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
