import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VirtrolioMessage } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MsgIoService {

  constructor(private afs: AngularFirestore) { }

  getMessages(uid: string) {
    return [];
  }

  sendMessage(message: VirtrolioMessage) {
    return;
  }
}
