import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppAuthService } from './app-auth.service';
import { VirtrolioUser } from '../shared/interfaces';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkGenService {

  constructor(private afs: AngularFirestore, private authService: AppAuthService) {
    console.log(this.getLink());
  }

  private static generateKey() {
    const length = 7;
    const options = 'qwertyuipasdfghjkzxcvbnmQWERTYUPASDFGHJKLZXCVBNM123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
      key += options.charAt(Math.floor(Math.random() * options.length));
    }
    return key;
  }

  async getLink() {
    let link = 'https://virtrolio.web.app/friend-link?uid=';
    const user = this.authService.uid();
    link += user + '&key=';
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user);
    link += await new Promise(resolve => {
      userRef.valueChanges().pipe(take(1)).subscribe(
        (data: any) => {
          resolve(data);
        }
      );
    }).then((userDoc: any) => {
      console.log(userDoc);
      link += userDoc.key;
    });
    return link;

  }

  checkKey(uid: string, key: string) {
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(uid);
    let correctKey: string;
    return userRef.valueChanges().subscribe(
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
    return userRef.update(
      { key: newKey }
    ).then(() => true);
  }
}
