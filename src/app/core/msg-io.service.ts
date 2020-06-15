import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { VirtrolioMessage, VirtrolioMessageTemplate } from '../shared/interfaces';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class MsgIoService {
  private currentYear = 2020;
  private maxMessageLength = 5000;

  private messagesCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.messagesCollection = afs.collection('messages');
    // TODO: Remove Test Message
    // const testMessage = {
    //   backColor: 'red',
    //   contents: 'hi',
    //   fontColor: 'white',
    //   fontFamily: 'Open Sans',
    //   from: 'BFlbQzLpG4fXxy0AVSyb',
    //   to: 's7OIMu1mrxZscVX4dx2K5d2XYvf2'
    // };
    // this.sendMessage(testMessage, '');
  }

  createBlankMessage() {
    const emptyMessage: VirtrolioMessageTemplate = {
      backColor: '',
      contents: '',
      fontColor: '',
      fontFamily: '',
      from: '',
      to: ''
    };
    return emptyMessage;
  }

  getMessages(uid: string) {
    return [];
  }

  sendMessage(messageTemplate: VirtrolioMessageTemplate, key: string) {
    // TODO: Add check for sender & recipient exists
    // TODO: Add key check
    // TODO: Add Font Family check
    // TODO: Add Color check
    if (messageTemplate.from == null || messageTemplate.to == null) {
      throw new ReferenceError('User is undefined or null');
    } else if (messageTemplate.contents.length > this.maxMessageLength) {
      throw new RangeError('Message is too long');
    } else if (messageTemplate.contents.length === 0) {
      throw new RangeError('Cannot send empty message');
    } else if (messageTemplate.backColor.length === 0 || messageTemplate.fontColor.length === 0 ||
      messageTemplate.fontFamily.length === 0) {
      throw new Error('A required formatting value is blank');
    }

    const message: VirtrolioMessage = {
      ...messageTemplate,
      timestamp: Timestamp.now(),
      isRead: false,
      year: this.currentYear
    };

    return this.messagesCollection.add(message).then(() => true);
  }
}
