import { Injectable } from '@angular/core';
import { MsgIoService } from './msg-io.service';
import { Fonts, VirtrolioMessage } from '../shared/interfaces';
import { FontService } from './font.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ViewingService {
  fonts: Fonts;
  singleMessage: VirtrolioMessage;
  currentMessageModal: VirtrolioMessage;
  messageToDelete: string;
  isCarouselView = false;
  nowMillis: number;

  /**
   * Retrieve message data from database
   */
  constructor(public msgIo: MsgIoService, private route: ActivatedRoute,
              private router: Router, private vps: ViewportScroller, private toastr: ToastrService) {
    this.fonts = FontService.fonts;
  }

  getMessageById(id: string) {
    this.msgIo.getMessage(id).subscribe(message => {
      this.singleMessage = message;
    });
  }

  decodeHtml(html: string) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  /**
   * Format the timestamp depending on how much time as elapsed
   * @param nowMillis time in milliseconds upon ngOnInit()
   * @param millis message Timestamp in milliseconds
   * @param date message Timestamp as a date
   */
  timeSince(nowMillis: number, millis: number, date: string) {
    const secondsPast = (nowMillis - millis) / 1000;
    if (secondsPast < 1) {
      return 'Just now';
    }
    if (secondsPast < 60) {
      return Math.round(secondsPast).toString() + 's ago';
    }
    if (secondsPast < 3600) {
      return (Math.round(secondsPast / 60)).toString() + 'm ago';
    }
    if (secondsPast < 86400) {
      return (Math.round(secondsPast / 3600)).toString() + 'h ago';
    }
    if (secondsPast <= 172800) {
      return '1 day ago';
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
   * Format the timestamp depending on how much time as elapsed
   * @param nowMillis time in milliseconds upon ngOnInit()
   * @param millis message Timestamp in milliseconds
   * @param date message Timestamp as a date
   */
  getDateSent(date: string) {
    return date;
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
    this.msgIo.deleteMessage(this.messageToDelete).then(() => {
      this.toastr.success('Message deleted successfully', 'Poof!', { positionClass: 'toast-bottom-full-width' });
    }).catch(e => {
      AuthService.displayError(e);
    });
  }

  /**
   * Append messageId query params to the url
   * @param id messageId
   */
  bookmarkMessage(id: string) {
  }
}
