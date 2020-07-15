import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

/**
 * Controls 'new user' cookie, displaying an alert if their browser hasn't visited the site before.
 *
 * @remarks
 * Implements the ngx-cookie-service {@link https://www.npmjs.com/package/ngx-cookie-service}
 *
 * @param showCookieAlert - boolean controlling alert display
 * @param showCookieAlertValue - private value extracted from cookie
 */
export class AppComponent implements OnInit {
  public title = 'virtrolio-site';
  public showCookieAlert = true;
  private showCookieAlertValue: string;

  constructor(private cookieService: CookieService) {
  }

  /** Dismisses cookie alert when X is clicked. Sets cookie to 'false'. */
  dismissCookieAlert() {
    this.cookieService.set('new-user-cookie', 'false', 365);
    this.showCookieAlert = false;
  }

  /**
   * OnInit, adds cookie to browser if nonexistent and updates the cookie service to display an alert
   * depending on the value of the cookie.
   */
  ngOnInit(): void {
    if (this.cookieService.check('new-user-cookie') === false) {
      this.cookieService.set('new-user-cookie', 'true', 365);
    }

    this.showCookieAlertValue = this.cookieService.get('new-user-cookie');

    if (this.showCookieAlertValue === 'true') {
      this.showCookieAlert = true;
    } else if (this.showCookieAlertValue === 'false') {
      this.showCookieAlert = false;
    } else {
      AuthService.displayError('Error. New-user-cookie not found or initialized properly.');
    }
  }
}
