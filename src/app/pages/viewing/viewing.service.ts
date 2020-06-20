import { Injectable } from '@angular/core';
import { MsgIoService } from '../../core/msg-io.service';
import { VirtrolioMessage } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ViewingService {
  messages: VirtrolioMessage[];
  isCardView: boolean = false;
  constructor(private msgio: MsgIoService) {
    this.msgio.getMessages().subscribe((msgData: VirtrolioMessage[]) => this.messages = msgData);
  }
}
