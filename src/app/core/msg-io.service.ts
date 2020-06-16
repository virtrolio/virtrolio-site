import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { VirtrolioDocument, VirtrolioMessage, VirtrolioMessageTemplate } from '../shared/interfaces';

import * as firebase from 'firebase';

import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import Timestamp = firebase.firestore.Timestamp;
import { AppAuthService } from './app-auth.service';

@Injectable({
  providedIn: 'root'
})
export class MsgIoService {
  private static readonly currentYear = 2020;
  private static readonly maxMessageLength = 5000;

  private messagesCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private authService: AppAuthService) {
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

  verifyVirtrolioMessageTemplate(message: VirtrolioMessageTemplate): boolean {
    if (typeof message.from === 'undefined' || !message.from) {
      throw new Error('Sender UID was not provided');
    } else if (typeof message.to === 'undefined' || !message.to) {
      throw new Error('Sender UID was not provided');
    } else if (typeof message.contents === 'undefined' || !message.contents) {
      throw new Error('Message contents were not provided');
    } else if (typeof message.backColor === 'undefined' || !message.backColor) {
      throw new Error('Background color was not provided');
    } else if (typeof message.fontColor === 'undefined' || !message.fontColor) {
      throw new Error('Font color was not provided');
    } else if (typeof message.fontFamily === 'undefined' || !message.fontFamily) {
      throw new Error('Font family was not provided');
    } else if (message.contents.length > MsgIoService.maxMessageLength) {
      throw new RangeError('Message is too long');
    } else {
      return true;
    }
  }

  /**
   * @returns A blank VirtrolioMessageTemplate, which should be modified the returned template to fill in the user data
   * and then passed into MsgIoService.sendMessage().
   */
  createBlankMessage(): VirtrolioMessageTemplate {
    return {
      backColor: '',
      contents: '',
      fontColor: '',
      fontFamily: '',
      from: '',
      to: ''
    };
  }

  /**
   * Getter for all of the messages that were sent to a particular user.
   * Pay careful attention to the fields that are returned in a VirtrolioMessage by reading interfaces.ts.
   * A VirtrolioMessage is NOT identical to a VirtrolioMessageTemplate.
   * @param uid - The Firebase Authentication user ID that is used to search for messages sent TO this user.
   * @returns An Observable that will contain an array of all messages sent to uid, including the message IDs.
   * @throws Error - If the argument is blank, null or undefined.
   */
  getMessages(uid: string): Observable<VirtrolioMessage[]> {
    // TODO: Add check for uid exists
    if (typeof uid === 'undefined' || !uid) {
      throw new Error('Argument UID was not provided');
    }
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
   * @returns A promise that evaluates to true if the operation is successful.
   * @throws RangeError - If the message is either blank or longer than maxMessageLength.
   * @throws Error - If any string field is blank, null or undefined.
   */
  sendMessage(messageTemplate: VirtrolioMessageTemplate, key: string): Promise<boolean> {
    // TODO: Add check for sender & recipient exists
    // TODO: Add key check
    // TODO: Add Font Family check
    // TODO: Add Color check
    // TODO: Add check for message filled with whitespace

    this.verifyVirtrolioMessageTemplate(messageTemplate);

    const message: VirtrolioDocument = {
      ...messageTemplate,
      timestamp: Timestamp.now(),
      isRead: false,
      year: MsgIoService.currentYear
    };

    return this.messagesCollection.add(message).then(() => true);
  }
}
