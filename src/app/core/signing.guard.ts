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

  // TODO: Documentation here; Extract URL using JavaScript and RegEx
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.key = params['key'];
    });

    // console.log('uid and key: ', this.uid, this.key, this.route.snapshot.paramMap.get('uid'), window.location.href);

    // TODO: Extract query params using Angular
    const linkStr = window.location.href;
    const uid = linkStr.match(/(?<=uid=)(.*)(?=&)/)[0];
    const key = linkStr.match(/(?<=key=)(.*)$/)[0];

    return this.authService.checkKey(uid, key).then(validKey => {
      if (validKey === false) {
        this.router.navigate(['/invalid-link']);
        return false;
      }
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/friend-link'], { queryParams: { uid: uid, key: key }});
        return false;
      }
    })
      .catch(error => {
        this.router.navigate(['/invalid-link']);
        return false;
      });
  }
}

