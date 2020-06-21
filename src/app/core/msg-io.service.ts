import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { VirtrolioDocument, VirtrolioMessage, VirtrolioMessageTemplate } from '../shared/interfaces';

import * as firebase from 'firebase';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FontService } from './font.service';
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
      // This condition (used several times below) checks for undefined, null or empty strings
      throw new Error('Recipient UID was not provided');
    } else if (typeof message.contents === 'undefined' || !message.contents) {
      throw new Error('Message contents were not provided');
    } else if (!message.contents.replace(/\s/g, '').length) {
      // Check if a message where all of the whitespace is deleted is blank which = entire message is whitespace
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
    } else if (!/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(message.fontColor)) { // Match for hex code such as: #FFFFFF
      throw new Error('Provided font color is not a valid hex code. Did you forget to include \'#\'?' +
        ' Provided color code: ' + message.fontColor);
    } else if (!/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(message.backColor)) { // Match for hex code such as: #FFFFFF
      throw new Error('Provided background color is not a valid hex code. Did you forget to include \'#\'?' +
        ' Provided color code: ' + message.backColor);
    } else if (!(message.fontFamily in FontService.fonts)) {
      throw new Error('Provided font family is not supported or doesn\'t exist: ' + message.fontFamily);
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
   * Marks the specified message as read by changing the isRead property of the message.
   * To avoid unnecessary writes, the caller of this method should check the isRead property prior to calling
   * this method. If that property is already true, this method should not be called.
   * The check should be done using the local copy of the message object that is used to display that message.
   * DO NOT get a new copy of the message - that would increase reads.
   * Assumes the message exists.
   * @param id - The ID of the message to mark as read.
   */
  async markAsRead(id: string): Promise<void> {
    await this.afs.collection('messages').doc<VirtrolioDocument>(id).update(
      { isRead: true }
    );
  }

  /**
   * Checks to see if the current user has already signed another user's virtrolio.
   * Assumes the UIDs were already checked to be valid.
   * @param toUID - The recipient of the message.
   * @returns true - If the current user has already signed the virtrolio of toUID.
   */
  async checkForMessage(toUID: string): Promise<boolean> {
    const messages = await this.afs.collection('messages', ref => ref
      .where('from', '==', this.authService.uid()).where('to', '==', toUID))
      .valueChanges().pipe(take(1)).toPromise();
    return messages.length !== 0;
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
    // Check message object contents for validity
    this.verifyMessage(messageTemplate);

    // Verify user is logged in
    this.authService.throwErrorIfLoggedOut('send a message');

    // Verify the yearbook has not already been signed
    if (await this.checkForMessage(messageTemplate.to)) {
      throw new Error('You have already signed this person\'s yearbook. If you want to sign it again,' +
        ' you\'ll have to ask them to delete your original response first.');
    }

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
          fromName: await this.authService.displayName(),
          fromPic: await this.authService.profilePictureLink()
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

  /**
   * Deletes a message PERMANENTLY. The caller of this method is responsible for alerting the user that the deletion is
   * irreversible.
   * It is highly suggested that the caller display a confirmation dialog to confirm the deletion before calling this
   * method, as there is no way to reverse this operation. Not even if you say 'please'.
   * @param mID - The message/document ID of the message to be deleted.
   */
  async deleteMessage(mID: string) {
    await this.afs.collection('messages').doc(mID).delete();
  }
}
