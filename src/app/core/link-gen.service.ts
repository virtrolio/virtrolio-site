import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppAuthService } from './app-auth.service';
import { VirtrolioUser } from '../shared/interfaces';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkGenService {
  static readonly keyLength = 7;
  static readonly keyOptions = 'qwertyuipasdfghjkzxcvbnmQWERTYUPASDFGHJKLZXCVBNM123456789';

  constructor(private afs: AngularFirestore, private authService: AppAuthService) {
    // this.checkKey(this.authService.uid(), 'abc').then(
    //   data => console.log(data)
    // );
  }

  private static generateKey() {
    let key = '';
    for (let i = 0; i < LinkGenService.keyLength; i++) {
      key += LinkGenService.keyOptions.charAt(Math.floor(Math.random() * LinkGenService.keyOptions.length));
    }
    return key;
  }

  async getLink() {
    let link = 'https://virtrolio.web.app/friend-link?uid=';
    const user = this.authService.uid();
    link += user + '&key=';
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user);
    link += await userRef.valueChanges().pipe(take(1)).toPromise().then((userDoc: any) => {
      console.log(userDoc);
      return userDoc.key;
    });
    return link;

  }

  async checkKey(uid: string, key: string) {
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(uid);
    let correctKey: string;
    return await userRef.valueChanges().pipe(take(1)).toPromise().then(
        (userDoc: any) => {
          correctKey = userDoc.key;
          return key === correctKey;
        }
      );
  }

  changeKey() {
    const user = this.authService.uid();
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user);
    const newKey = LinkGenService.generateKey();
    return userRef.update(
      { key: newKey }
    ).then(() => true);
  }
}
