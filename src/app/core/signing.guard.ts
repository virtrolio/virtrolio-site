import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * AuthGuard on all /signing pages. Redirects to /friend-link if not signed in, redirect to /invalid-link 
 * if invalid uid or key.
 *
 * @param uid - extracted from url manually using RegEx
 * @param key - extracted from url manually using RegEx
 *
 */
export class SigningGuard implements CanActivate {
  static uid = 'invalid';
  static key = 'invalid';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    /**
     * Regex Extraction of 'uid' and 'key' params
     *
     * // TODO: Extract query params using Angular
     */
    try {
      const linkStr = window.location.href;
      SigningGuard.uid = linkStr.match(/(?<=uid=)(.*)(?=&)/)[0];
      SigningGuard.key = linkStr.match(/(?<=key=)(.*)$/)[0];
    } catch (e) {
      this.router.navigate(['/invalid-link']);
    }

    /** Redirection based on authService.checkKey() & authService.isLoggedIn() */
    return this.authService.checkKey(SigningGuard.uid, SigningGuard.key).then(validKey => {
      if (validKey === false) {
        this.router.navigate(['/invalid-link']);
        return false;
      }
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/friend-link'], { queryParams: { uid: SigningGuard.uid, key: SigningGuard.key } });
        return false;
      }
    })
      .catch(error => {
        this.router.navigate(['/invalid-link']);
        return false;
      });
  }
}

