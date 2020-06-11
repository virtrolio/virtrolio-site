import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private user: User;
  private LoggedIn: boolean;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.angularFireAuth.user.subscribe((user: User) => this.user = user);
  }

  /**
   * Logs the user into the website using Firebase Authentication and the specified provider.
   * Upon login, the user will be redirected to a new page as defined in routeTo.
   * @param routeTo - The routerLink that the user will be redirected to on a successful login.
   * @returns True if the redirect is successful.
   */
  login(routeTo: string){
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider()).then((userCredentials) => {
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
    this.angularFireAuth.signOut().then(() => {
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
}
