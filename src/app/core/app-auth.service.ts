import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {auth} from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  constructor(public auth: AngularFireAuth) {
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
