import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private user: User;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.angularFireAuth.user.subscribe((user: User) => this.user = user);
  }

  login(routeTo: string) {
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider()).then((userCredentials) => {
      if (userCredentials.user) {  // If user is not null
        return this.router.navigate([ routeTo ]);
      } else {
        return this.router.navigate([ '/' ]);
      }
    });
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      return this.router.navigate([ '/' ]);
    });
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  profilePictureLink(): string {
    if (this.user) {
      return this.user.photoURL;
    } else {
      return '';
    }
  }

  displayName(): string {
    if (this.user) {
      return this.user.displayName;
    } else {
      return '';
    }
  }
}
