import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppAuthService } from './app-auth.service';
import { VirtrolioUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LinkGenService {

  constructor(private afs: AngularFirestore, private authService: AppAuthService) { }

  private static generateKey() {
    const length = 7;
    const options = 'qwertyuipasdfghjkzxcvbnmQWERTYUPASDFGHJKLZXCVBNM123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
      key += options.charAt(Math.floor(Math.random() * options.length));
    }
    return key;
  }

  getKey() {
    const user = this.authService.uid();
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user);
    userRef.valueChanges().subscribe(
      userDoc => {
        return userDoc.key;
      }
    );
  }

  checkKey(uid: string, key: string) {
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(uid);
    let correctKey: string;
    userRef.valueChanges().subscribe(
      userDoc => {
        correctKey = userDoc.key;
        return key === correctKey;
      }
    );
  }

  changeKey() {
    const user = this.authService.uid();
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user);
    const newKey = LinkGenService.generateKey();
    userRef.update(
      { key: newKey }
    ).then(() => true);
  }
}
