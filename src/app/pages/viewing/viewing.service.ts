import { Injectable } from '@angular/core';
import { MsgIoService } from '../../core/msg-io.service';
import { VirtrolioMessage } from '../../shared/interfaces';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewingService {
  messages: VirtrolioMessage[];
  numMessages: number;
  isCarouselView = false;
  constructor(public msgIo: MsgIoService) {
    // Subscribe to the array of VirtrolioMessage observables and make data available in messages variable
    this.msgIo.getMessages().subscribe((messages: VirtrolioMessage[]) => {
      this.messages = messages;
      this.numMessages = messages.length;
    });
  }
}
