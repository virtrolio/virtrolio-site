import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { VirtrolioUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.afa.user.subscribe((user: User) => this.user = user);
  }
  static readonly keyLength = 7;
  static readonly keyOptions = 'qwertyuipasdfghjkzxcvbnmQWERTYUPASDFGHJKLZXCVBNM123456789';

  private user: User;

  /**
   * Generates a random string of characters of length AppAuthService.keyLength using the characters in
   * AppAuthService.keyOptions.
   */
  private static generateKey(): string {
    let key = '';
    for (let i = 0; i < AuthService.keyLength; i++) {
      key += AuthService.keyOptions.charAt(Math.floor(Math.random() * AuthService.keyOptions.length));
    }
    return key;
  }

  // Auth
  /**
   * Logs the user into the website using Firebase Authentication and the specified provider.
   * Also calls createUser() so that the user's internal data is created at the same time.
   * Upon login, the user will be redirected to a new page as defined in routeTo.
   * @param routeTo - The routerLink that the user will be redirected to on a successful login.
   * @param queryParams - Optional - Any query params to be passed during navigation after successful navigation.
   * @returns A promise evaluating to true if the redirect is successful.
   */
  async login(routeTo: string, queryParams?: object): Promise<boolean> {
    if (typeof routeTo === 'undefined' || !routeTo) {
      throw new Error('Route was not provided');
    }
    return this.afa.signInWithPopup(new auth.GoogleAuthProvider()).then((userCredentials) => {
      if (userCredentials.user) {  // If user is not null
        return this.createUser(userCredentials.user).then(() => {
          return this.router.navigate([ routeTo ], { queryParams });
        });
      } else {
        console.log('Login failed');
        return this.router.navigate([ '/' ]);
      }
    });
  }

  /**
   * Logs the user out of the website using Firebase Authentication.
   * Upon successful logout, the user will be redirected to the home page.
   * @returns A promise evaluating to true if the redirect is successful.
   */
  logout(): Promise<boolean> {
    return this.afa.signOut().then(() => {
      return this.router.navigate([ '/' ]);
    });
  }

  /**
   * Creates a new VirtrolioUser document in the 'users' collection of the database only if the document for the
   * currently logged in user doesn't exist.
   */
  async createUser(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user.uid);
    const userDoc = await userRef.valueChanges().pipe(take(1)).toPromise();

    if (!userDoc) { // User doesn't exist in database
      const userData: VirtrolioUser = {
        displayName: this.user.displayName,
        key: AuthService.generateKey(),
        profilePic: this.user.photoURL
      };
      await userRef.set(userData);
    } else { // User exists in database, make sure all fields are present
      if (!('key' in userDoc)) {
        await userRef.update({ key: AuthService.generateKey() });
      }
      if (!('displayName' in userDoc)) {
        await userRef.update({ displayName: user.displayName });
      }
      if (!('profilePic' in userDoc)) {
        await userRef.update({ profilePic: user.photoURL });
      }
    }
  }

  /**
   * @returns True if the user is logged in.
   */
  isLoggedIn(): boolean {
    return this.user != null;
  }

  /**
   * Throws a ReferenceError if the user is logged out instead of returning false (that's isLoggedIn()).
   * Does nothing if the user is logged in.
   * The Error is designed in such a way that the error message can be displayed to the user using a Modal.
   * @param attemptedOperation - The operation that is not permitted if the user is logged out, such as 'send a message'
   * . Should be in present tense and be in user-friendly language.
   * @throws ReferenceError - If the user is not logged in
   */
  throwErrorIfLoggedOut(attemptedOperation: string): void {
    if (!this.isLoggedIn()) {
      throw new ReferenceError('Cannot ' + attemptedOperation + ' because you are not logged in.');
    }
  }

  /**
   * @returns The URL to the user's profile picture.
   * @throws ReferenceError - If the user is not logged in
   */
  async profilePictureLink(uid?: string): Promise<string> {
    this.throwErrorIfLoggedOut('get your profile picture');
    // noinspection DuplicatedCode
    if (uid === this.uid() || typeof uid === 'undefined') {
      return this.user.photoURL;
    } else {
      const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(uid);
      return (await userRef.valueChanges().pipe(take(1)).toPromise()).profilePic;
    }
  }

  /**
   * @returns The Display Name of the user as defined in the account that they use to sign in.
   * @throws ReferenceError - If the user is not logged in
   */
  async displayName(uid?: string): Promise<string> {
    this.throwErrorIfLoggedOut('get your name');
    // noinspection DuplicatedCode
    if (uid === this.uid() || typeof uid === 'undefined') {
      return this.user.displayName;
    } else {
      const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(uid);
      return (await userRef.valueChanges().pipe(take(1)).toPromise()).displayName;
    }
  }

  /**
   * @returns The user's Firebase Authentication User ID.
   * @throws ReferenceError - If the user is not logged in
   */
  uid(): string {
    this.throwErrorIfLoggedOut('get your user ID');
    return this.user.uid;
  }

  /**
   * Checks if the provided user exists in the Users collection in the database.
   * This method should only be called if the user has logged in at least once before.
   * @param uid - The UID of the user to check
   * @throws Error - If the argument is blank, null or undefined.
   */
  async userExists(uid: string): Promise<boolean> {
    if (typeof uid === 'undefined' || !uid) {
      throw new Error('Argument UID was not provided');
    }
    const userRef = this.afs.collection('users').doc(uid);
    return userRef.snapshotChanges().pipe(take(1)).toPromise().then((userDoc: any) => {
        return userDoc.payload.exists;
      }
    );
  }

  // Link-gen
  /**
   * Generates the shareable signing link for the current user. The signing link has two query parameters that are used
   * by Angular routerLink. The first is 'uid', which is the current user's Firebase Authentication User ID.
   * The second is 'key', which is generated by AppAuthService.changeKey().
   * @returns The sharable signing link for the current user, usable by FriendLinkComponent.
   * @throws ReferenceError - If the user is not logged in
   */
  async getLink(): Promise<string> {
    this.throwErrorIfLoggedOut('get your sharing link');

    let link = 'https://virtrolio.web.app/signing?uid=';
    const user = this.uid();
    link += user + '&key=';
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user);
    let key = (await userRef.valueChanges().pipe(take(1)).toPromise()).key;
    if (typeof key === 'undefined' || !key) {
      await this.changeKey();
      key = (await userRef.valueChanges().pipe(take(1)).toPromise()).key;
    }
    link += key;
    return link;
  }

  /**
   * Verifies if the provided key matches the key for the provided user in the database.
   * Used to verify a correct link before allowing a user to sign someone else's Virtrolio.
   * @param uid - The user ID of the user to check the key against. Usually the **recipient** of the message.
   * @param key - The key provided by the sender to verify. Should be obtained from the provided 'key' query parameter
   * in the URL.
   * @returns - A promise evaluating to true if the key is correct, false if the key is incorrect.
   * @throws Error - If either argument is blank, null or undefined.
   * @throws ReferenceError - if the UID does not exist.
   */
  async checkKey(uid: string, key: string): Promise<boolean> {
    if (typeof uid === 'undefined' || !uid) {
      throw new Error('Argument UID was not provided');
    } else if (typeof key === 'undefined' || !key) {
      throw new Error('Argument Key was not provided');
    }

    return this.userExists(uid).then(async userExists => {
      if (userExists) {
        const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(uid);
        let correctKey: string;
        return userRef.valueChanges().pipe(take(1)).toPromise().then(async userDoc => {
            correctKey = userDoc.key;
            return key === correctKey;
          }
        );
      } else {
        throw new ReferenceError('User does not exist in the \'users\' database');
      }
    });
  }

  /**
   * Replaces the current user's key with a new and randomly generated key.
   * No parameters are expected because only the key of the currently logged in user can be changed.
   * Assumes that the user is logged in (components using this method should be protected using AuthGuard)
   * @throws ReferenceError - If the user is not logged in
   */
  async changeKey(): Promise<void> {
    this.throwErrorIfLoggedOut('change your key');
    const user = this.uid();
    const userRef: AngularFirestoreDocument<VirtrolioUser> = this.afs.collection('users').doc<VirtrolioUser>(user);
    const userDoc = await userRef.valueChanges().pipe(take(1)).toPromise();
    if (!('key' in userDoc)) { // This triggers if the key doesn't exist
      return userRef.update(
        { key: AuthService.generateKey() }
      );
    } else { // If the key does exist, need to make sure the new key is unique
      const oldKey = userDoc.key;
      let newKey = AuthService.generateKey();
      while (oldKey === newKey) {
        newKey = AuthService.generateKey();
      }
      return userRef.update(
        { key: newKey }
      );
    }
  }
}
