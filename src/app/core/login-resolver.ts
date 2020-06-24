import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from 'firebase/app';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class LoginResolver implements Resolve<User> {
  constructor(private angularFireAuth: AngularFireAuth) { }

  // noinspection JSUnusedLocalSymbols
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User> {
    return this.angularFireAuth.user.pipe(take(1));
  }
}
