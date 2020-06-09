import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  constructor(private _auth: AngularFireAuth, private _router: Router) {
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

  isLoggedIn() {
    return this._auth.currentUser !== null
  }

  async profilePictureLink() {
    if (this._auth.currentUser) {
      return (await this._auth.currentUser).photoURL
    } else {
      throw new TypeError("User is not logged in")
    }
  }
}
