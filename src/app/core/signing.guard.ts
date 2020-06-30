import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { MsgIoService } from './msg-io.service';

@Injectable({
  providedIn: 'root'
})

/**
 * AuthGuard on all /signing pages. Redirects to /signing-auth-redirect if not signed in, redirect to /invalid-link
 * if invalid uid or key.
 *
 * @param uid - extracted from url manually using RegEx
 * @param key - extracted from url manually using RegEx
 *
 */
export class SigningGuard implements CanActivate {
  static uid = 'invalid';
  static key = 'invalid';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router,
              private msgIOService: MsgIoService) { }

  // noinspection JSUnusedLocalSymbols
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Regex Extraction of 'uid' and 'key' params
    try {
      const linkStr = window.location.href;
      SigningGuard.uid = linkStr.match(/uid=([^&]*)/)[1];
      SigningGuard.key = linkStr.match(/key=([^&]*)/)[1];
    } catch (error) {
      AuthService.displayError(error);
      this.router.navigate([ '/invalid-link' ]).catch(error => AuthService.displayError(error));
    }

    // User must be signed in
    return this.authService.asyncIsLoggedIn().then(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate([ '/signing-auth-redirect' ], { queryParams: { uid: SigningGuard.uid, key: SigningGuard.key } })
          .catch(e => AuthService.displayError(e));
        return false;
      } else {
        // Sender must not have previously signed the recipient's virtrolio
        return this.authService.checkKey(SigningGuard.uid, SigningGuard.key).then(validKey => {
          if (validKey === false) {
            this.router.navigate([ '/invalid-link' ]).catch(error => AuthService.displayError(error));
            return false;
          }
          this.msgIOService.checkForMessage(SigningGuard.uid).then((signed) => {
            if (signed) {
              this.router.navigate([ '/rejecc' ]).catch(error => AuthService.displayError(error));
              return false;
            } else {
              return true;
            }
          }).catch(error => {
            // Only possibilities for a Firebase error getting thrown:
            // 1. Not logged in
            // 2. Requested message was NOT sent by current user (impossible based on logic of checkMessage() unless someone
            // modifies the source code)
            console.log(error);
            AuthService.displayError(error);
            this.router.navigate([ '/signing-auth-redirect' ], { queryParams: { uid: SigningGuard.uid, key: SigningGuard.key } })
              .catch(navError => AuthService.displayError(navError));
          });
          return true;
        }).catch(error => {
          // noinspection JSIgnoredPromiseFromCall
          console.log(error);
          AuthService.displayError(error);
          this.router.navigate([ '/invalid-link' ]).catch(e => AuthService.displayError(e));
          return false;
        });
      }
    });
  }
}
