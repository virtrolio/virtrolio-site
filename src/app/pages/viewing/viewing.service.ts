import { Injectable } from '@angular/core';
import { MsgIoService } from '../../core/msg-io.service';
import { VirtrolioMessage } from '../../shared/interfaces';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class ViewingService {
  messages: VirtrolioMessage[];
  numMessages: number;
  isCarouselView = false;
  nowMillis: number;
  /**
   * Retrieve message data from database
   */
  constructor(public msgIo: MsgIoService) {
    this.msgIo.getMessages().subscribe((messages: VirtrolioMessage[]) => {
      this.messages = messages;
      this.numMessages = messages.length;
    });
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
}
