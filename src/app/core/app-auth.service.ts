import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
   * Upon login, the user will be redirected to a new page as defined in routeTo.
   * @param routeTo - The routerLink that the user will be redirected to on a successful login.
   * @returns True if the redirect is successful.
   */
  login(routeTo: string) {
    if (typeof routeTo === 'undefined' || !routeTo) {
      throw new Error('Route was not provided');
    }
    this.afa.signInWithPopup(new auth.GoogleAuthProvider()).then((userCredentials) => {
      if (userCredentials.user) {  // If user is not null
        return this.router.navigate([ routeTo ]);
      } else {
        return this.router.navigate([ '/' ]);
      }
    });
  }

  /**
   * Logs the user out of the website using Firebase Authentication.
   * Upon successful logout, the user will be redirected to the home page.
   * @returns True if the redirect is successful.
   */
  logout() {
    this.afa.signOut().then(() => {
      return this.router.navigate([ '/' ]);
    });
  }

  /**
   * @returns True if the user is logged in.
   */
  isLoggedIn(): boolean {
    return this.user != null;
  }

  /**
   * @returns The URL to the user's profile picture.
   */
  profilePictureLink(): string {
    if (this.user) {
      return this.user.photoURL;
    } else {
      return '';
    }
  }

  /**
   * @returns The Display Name of the user as defined in the account that they use to sign in.
   */
  displayName(): string {
    if (this.user) {
      return this.user.displayName;
    } else {
      return '';
    }
  }

  /**
   * @returns The user's Firebase Authentication User ID.
   */
  uid(): string {
    if (this.user) {
      return this.user.uid;
    } else {
      return '';
    }
  }

  /**
   * Checks if the provided user exists in the Users collection in the database.
   * This method should only be called if the user has logged in at least once before.
   * @param uid - The UID of the user to check
   * @throws Error - If the argument is blank, null or undefined.
   */
  async userExists(uid: string) {
    if (typeof uid === 'undefined' || !uid) {
      throw new Error('Argument UID was not provided');
    }
    const userRef = this.afs.collection('users').doc(uid);
    return await userRef.snapshotChanges().pipe(take(1)).toPromise().then((userDoc: any) => {
        return userDoc.payload.exists;
      }
    );
  }
}
