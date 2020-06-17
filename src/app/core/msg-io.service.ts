import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { VirtrolioDocument, VirtrolioMessage, VirtrolioMessageTemplate } from '../shared/interfaces';

import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppAuthService } from './app-auth.service';
import { LinkGenService } from './link-gen.service';

@Injectable({
  providedIn: 'root'
})
export class MsgIoService {
  static readonly currentYear = 2020;
  static readonly maxMessageLength = 5000;

  private messagesCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private authService: AppAuthService, private lgs: LinkGenService) {
    this.messagesCollection = afs.collection('messages');
  }

  /**
   * Helper method for sendMessage(). Checks the contents of the provided message to verify that there are no errors,
   * and that all required fields were provided. Throws an error if any field is incorrect or not provided.
   * @param message - The message to be checked.
   * @throws Error - If any field is blank, null, undefined or otherwise invalid.
   * @throws Error - If the method is called while logged out.
   * @throws RangeError - If the contents of the message exceed the value of the maxMessageLength constant defined
   * in MsgIoService.
   * @throws ReferenceError - If the UID does not refer to a valid user.
   */
  verifyMessage(message: VirtrolioMessageTemplate): void {
    if (typeof message.from === 'undefined' || !message.from) {
      throw new Error('Sender UID was not provided');
    } else if (typeof message.to === 'undefined' || !message.to) {
      throw new Error('Sender UID was not provided');
    } else if (typeof message.contents === 'undefined' || !message.contents) {
      throw new Error('Message contents were not provided');
    } else if (!message.contents.replace(/\s/g, '').length) {
      throw new Error('Message contents cannot solely consist of whitespace/blanks');
    } else if (typeof message.backColor === 'undefined' || !message.backColor) {
      throw new Error('Background color was not provided');
    } else if (typeof message.fontColor === 'undefined' || !message.fontColor) {
      throw new Error('Font color was not provided');
    } else if (typeof message.fontFamily === 'undefined' || !message.fontFamily) {
      throw new Error('Font family was not provided');
    } else if (!this.authService.isLoggedIn()) {
      throw new Error('Cannot send message while logged out');
    } else if (message.contents.length > MsgIoService.maxMessageLength) {
      // TODO: Print max length
      throw new RangeError('Message is too long');
    } else if (message.from !== this.authService.uid()) {
      throw new ReferenceError('Sender UID does not match current UID');
    }
    // Return not needed as an error will be thrown if something is wrong
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
   * @throws RangeError - Thrown by helper method this.verifyMessage()
   * @throws Error - Thrown by helper method this.verifyMessage()
   * @throws ReferenceError - Thrown by helper method this.verifyMessage()
   */
  sendMessage(messageTemplate: VirtrolioMessageTemplate, key: string): Promise<boolean> {
    // TODO: Add Font Family check
    // TODO: Add Color check

    // Check message object contents for validity
    this.verifyMessage(messageTemplate);

    // Verify correct key
    return this.lgs.checkKey(messageTemplate.to, key).then(async keyIsCorrect => {
      if (keyIsCorrect) {
        return await this.authService.userExists(messageTemplate.from).then(async fromExists => {
          if (fromExists) {
            return await this.authService.userExists(messageTemplate.to).then(async toExists => {
              if (toExists) {
                // Add remaining autogenerated fields
                const message: VirtrolioDocument = {
                  ...messageTemplate, // Shallow copy of messageTemplate
                  timestamp: Timestamp.now(),
                  isRead: false,
                  year: MsgIoService.currentYear
                };

                // Send the message
                return await this.messagesCollection.add(message).then(() => true);
              } else {
                throw new Error('Recipient does not exist in the \'users\' database');
              }
            });
          } else {
            throw new Error('Sender does not exist in the \'users\' database');
          }
        });
      } else {
        throw new Error('Incorrect key');
      }
    });
  }
}
