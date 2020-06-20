import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class SigningGuard implements CanActivate {
  static uid = 'invalid';
  static key = 'invalid';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  // TODO: Documentation here; Extract URL using JavaScript and RegEx
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // TODO: Extract query params using Angular
    const linkStr = window.location.href;

    try {
      SigningGuard.uid = linkStr.match(/(?<=uid=)(.*)(?=&)/)[0];
      SigningGuard.key = linkStr.match(/(?<=key=)(.*)$/)[0];
    } catch (e) { }

    return this.authService.checkKey(SigningGuard.uid, SigningGuard.key).then(validKey => {
      if (validKey === false) {
        console.log('1');
        this.router.navigate(['/invalid-link']);
        return false;
      }
      if (this.authService.isLoggedIn()) {
        console.log('2');
        return true;
      } else {
        console.log('3');
        this.router.navigate(['/friend-link'], { queryParams: { uid: SigningGuard.uid, key: SigningGuard.key } });
        return false;
      }
    })
      .catch(error => {
        console.log('4');
        this.router.navigate(['/invalid-link']);
        return false;
      });
  }
}

