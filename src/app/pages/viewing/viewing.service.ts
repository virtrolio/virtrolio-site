import { Injectable } from '@angular/core';
import { MsgIoService } from '../../core/msg-io.service';
import { VirtrolioMessage } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ViewingService {
  messages: VirtrolioMessage[];
  isCardView = false;
  constructor(private msgIo: MsgIoService) {
    this.msgIo.getMessages().subscribe((msgData: VirtrolioMessage[]) => this.messages = msgData);
  }
}
