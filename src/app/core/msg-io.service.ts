import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { VirtrolioDocument, VirtrolioMessage, VirtrolioMessageTemplate } from '../shared/interfaces';

import * as firebase from 'firebase';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class MsgIoService {
  static readonly currentYear = 2020;
  static readonly maxMessageLength = 5000;

  private messagesCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.messagesCollection = afs.collection('messages');
  }

  /**
   * Helper method for sendMessage(). Checks the contents of the provided message to verify that there are no errors,
   * and that all required fields were provided. Throws an error if any field is incorrect or not provided.
   * @param message - The message to be checked.
   * @throws Error - If any field is blank, null, undefined or otherwise invalid.
   * @throws RangeError - If the contents of the message exceed the value of the maxMessageLength constant defined
   * in MsgIoService.
   */
  verifyMessage(message: VirtrolioMessageTemplate): void {
    if (typeof message.to === 'undefined' || !message.to) {
      throw new Error('Recipient UID was not provided');
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
    } else if (message.contents.length > MsgIoService.maxMessageLength) {
      throw new RangeError('Message is too long. The max length is ' + MsgIoService.maxMessageLength + ' characters, ' +
        'and the provided message is ' + message.contents.length + ' characters long.');
    } else if (!/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(message.fontColor)) {
      throw new Error('Provided font color is not a valid hex code. Did you forget to include #?');
    } else if (!/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(message.backColor)) {
      throw new Error('Provided background color is not a valid hex code. Did you forget to include #?');
    }
    // Return not needed as an error will be thrown if something is wrong
  }

  /**
   * @returns A blank VirtrolioMessageTemplate, which should be modified the returned template to fill in the user data
   * and then passed into MsgIoService.sendMessage().
   */
  createBlankMessage(): VirtrolioMessageTemplate {
    return new VirtrolioMessageTemplate();
  }

  /**
   * Getter for all of the messages that were sent to a particular user.
   * Pay careful attention to the fields that are returned in a VirtrolioMessage by reading interfaces.ts.
   * A VirtrolioMessage is NOT identical to a VirtrolioMessageTemplate.
   * @returns An Observable that will contain an array of all messages sent to uid, including the message IDs.
   * @throws Error - If the argument is blank, null or undefined.
   */
  getMessages(): Observable<VirtrolioMessage[]> {
    this.authService.throwErrorIfLoggedOut('get your messages');

    return this.afs.collection('messages', ref => ref.where('to', '==', this.authService.uid()))
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
   * @throws RangeError - Thrown by helper method this.verifyMessage()
   * @throws Error - Thrown by helper method this.verifyMessage()
   * @throws TypeError - If the key is incorrect
   * @throws ReferenceError - If this method is called when logged out
   */
  async sendMessage(messageTemplate: VirtrolioMessageTemplate, key: string): Promise<void> {
    // TODO: Add Font Family check

    // Check message object contents for validity
    this.verifyMessage(messageTemplate);

    // Verify user is logged in
    this.authService.throwErrorIfLoggedOut('send a message');

    // Verify correct key
    const keyIsCorrect = await this.authService.checkKey(messageTemplate.to, key);
    if (keyIsCorrect) {
      const toExists = await this.authService.userExists(messageTemplate.to);
      if (toExists) {
        // Add remaining autogenerated fields
        const message: VirtrolioDocument = {
          ...messageTemplate, // Shallow copy of messageTemplate
          from: this.authService.uid(),
          timestamp: Timestamp.now(),
          isRead: false,
          year: MsgIoService.currentYear,
          fromName: await this.authService.displayName()
        };

        // Send the message
        await this.messagesCollection.add(message);
      } else {
        throw new Error('Recipient does not exist in the \'users\' database');
      }
    } else {
      throw new TypeError('Incorrect key');
    }
  }
}
