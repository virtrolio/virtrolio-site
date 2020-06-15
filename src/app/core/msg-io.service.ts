import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { VirtrolioDocument, VirtrolioMessage, VirtrolioMessageTemplate } from '../shared/interfaces';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    //   from: 'test',
    //   to: 'test'
    // };
    // this.sendMessage(testMessage, '');
    // this.getMessages('test').subscribe(messages => console.log(messages));
  }

  /**
   * @returns A blank VirtrolioMessageTemplate, which should be modified the returned template to fill in the user data
   * and then passed into MsgIoService.sendMessage().
   */
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

  /**
   * Getter for all of the messages that were sent to a particular user.
   * Pay careful attention to the fields that are returned in a VirtrolioMessage by reading interfaces.ts.
   * A VirtrolioMessage is NOT identical to a VirtrolioMessageTemplate.
   * @param uid - The Firebase Authentication user ID that is used to search for messages sent TO this user.
   * @returns An Observable that will contain an array of all messages sent to uid, including the message IDs.
   */
  getMessages(uid: string): Observable<VirtrolioMessage[]> {
    // TODO: Add check for uid exists
    return this.afs.collection('messages', ref => ref.where('to', '==', uid))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as VirtrolioDocument;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  /**
   * Used to send a Virtrolio message (defined by VirtrolioMessageTemplate) by adding it to the Firestore database.
   * @param messageTemplate - The contents and settings of the message. This should be a VirtrolioMessageTemplate that
   * was created by MsgIoService.createBlankMessage and then modified to fill in the user data. You should **NOT** try
   * to pass in a VirtrolioMessageTemplate that you create yourself.
   * @param key - The key of the recipient of the message. This should be extracted from the URL provided by the sender.
   * @returns true if the operation is successful.
   * @throws ReferenceError - If either the from or to UIDs are blank.
   * @throws RangeError - If the message is either blank or longer than maxMessageLength.
   * @throws Error - If any of the other fields in VirtrolioMessageTemplate are left blank.
   */
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

    const message: VirtrolioDocument = {
      ...messageTemplate,
      timestamp: Timestamp.now(),
      isRead: false,
      year: this.currentYear
    };

    return this.messagesCollection.add(message).then(() => true);
  }
}
