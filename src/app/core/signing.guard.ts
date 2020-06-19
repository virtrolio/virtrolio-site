import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SigningGuard implements CanActivate {
  uid: string;
  key: string;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.key = params['key'];
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.key = params['key'];
    });

    // Retrieving URL params is returning 'undefined' for some reasonnn
    return this.authService.checkKey('01GHzGKQMzXxU0oYDnvoU8jtvdr2', 'qH1jic1').then(validKey => {
      if (validKey === false) {
        console.log('false key');
        this.router.navigate(['/invalid-link']);
        return false;
      }
      if (this.authService.isLoggedIn()) {
        console.log('rerouting to signing');
        return true;
      } else {
        console.log('rerouting to friend-link');
        this.router.navigate(['/friend-link']);
        return false;
      }
    })
      .catch(error => {
        console.log('error while checking key');
        this.router.navigate(['/invalid-link']);
        return false;
      });
  }

}
