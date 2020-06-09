import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth, User } from "firebase/app";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private _user: User;

  constructor(private _auth: AngularFireAuth, private _router: Router) {
    this._auth.user.subscribe((user: User) => this._user = user);
  }

  login(routeTo: string) {
    this._auth.signInWithPopup(new auth.GoogleAuthProvider()).then((userCredentials) => {
      if (userCredentials.user) {  // If user is not null
        return this._router.navigate([ routeTo ])
      } else {
        return this._router.navigate([ "/" ])
      }
    })
  }

  logout() {
    this._auth.signOut().then(() => {
      return this._router.navigate([ "/" ])
    });
  }

  isLoggedIn(): boolean {
    return this._user !== null
  }

  profilePictureLink(): string {
    if (this._user) {
      return this._user.photoURL
    } else {
      return ""
    }
  }

  displayName(): string {
    if (this._user) {
      return this._user.displayName
    } else {
      return ""
    }
  }
}
