import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreventURLAccessGuard implements CanActivate {

  constructor(private router: Router) { }

  // noinspection JSUnusedLocalSymbols
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.router.url === '/') {
      this.router.navigate(['/access-denied']).catch(error => AuthService.displayError(error));
      return false;
    }
    return true;
  }

}
