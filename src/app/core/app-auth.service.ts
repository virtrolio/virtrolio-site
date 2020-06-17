import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { VirtrolioUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private user: User;

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.afa.user.subscribe((user: User) => this.user = user);
  }

  /**
   * Logs the user into the website using Firebase Authentication and the specified provider.
   * Also calls createUser() so that the user's internal data is created at the same time.
   * Upon login, the user will be redirected to a new page as defined in routeTo.
   * @param routeTo - The routerLink that the user will be redirected to on a successful login.
   * @returns A promise evaluating to true if the redirect is successful.
   */
  login(routeTo: string): Promise<boolean> {
    if (typeof routeTo === 'undefined' || !routeTo) {
      throw new Error('Route was not provided');
    }
    return this.afa.signInWithPopup(new auth.GoogleAuthProvider()).then((userCredentials) => {
      if (userCredentials.user) {  // If user is not null
        return this.createUser().then(() => {
          return this.router.navigate([ routeTo ]);
        });
      } else {
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

  async createUser() {
    this.throwErrorIfLoggedOut('create user');

    const userRef = this.afs.collection('users').doc(this.uid());

    // Create user data only if it doesn't exist already
    userRef.valueChanges().subscribe(async (user: VirtrolioUser) => {
      if (!user) { // User data doesn't exist, so create data
        const userData: VirtrolioUser = {
          displayName: this.user.displayName,
          key: ''
        };
        await userRef.set({ userData });
      }
    });
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
   * @throws ReferenceError - If logged out
   */
  throwErrorIfLoggedOut(attemptedOperation: string): void {
    if (!this.isLoggedIn()) {
      throw new ReferenceError('Cannot ' + attemptedOperation + ' because you are not logged in.');
    }
  }

  /**
   * @returns The URL to the user's profile picture.
   */
  profilePictureLink(): string {
    this.throwErrorIfLoggedOut('get your profile picture');
    return this.user.photoURL;
  }

  /**
   * @returns The Display Name of the user as defined in the account that they use to sign in.
   */
  displayName(): string {
    // TODO: Allow UID as a parameter
    this.throwErrorIfLoggedOut('get your name');
    return this.user.displayName;
  }

  /**
   * @returns The user's Firebase Authentication User ID.
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
}
