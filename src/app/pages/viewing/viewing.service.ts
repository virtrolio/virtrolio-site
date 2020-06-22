import { Injectable } from '@angular/core';
import { MsgIoService } from '../../core/msg-io.service';
import { VirtrolioMessage } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ViewingService {
  messages: VirtrolioMessage[];
  numMessages: number;
  isCarouselView = false;
  /**
  * Retrieve message data from database
  */
  constructor(public msgIo: MsgIoService) {
    this.msgIo.getMessages().subscribe((messages: VirtrolioMessage[]) => {
      this.messages = messages;
      this.numMessages = messages.length;
    });
  }
}
