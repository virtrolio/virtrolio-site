import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VirtrolioMessage } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MsgIoService {
  private currentYear = 2020;

  constructor(private afs: AngularFirestore) { }

  createBlankMessage() {
    const emptyMessage: VirtrolioMessage = {
      backColor: '',
      contents: '',
      fontColor: '',
      fontFamily: '',
      from: '',
      to: '',
      isRead: false,
      year: this.currentYear,
    };
    return emptyMessage;
  }

  getMessages(uid: string) {
    return [];
  }

  sendMessage(message: VirtrolioMessage) {
    return;
  }
}
