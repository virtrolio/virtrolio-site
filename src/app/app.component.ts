import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// noinspection JSUnusedLocalSymbols
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit {
  public title = 'virtrolio-site';
  public showCookieAlert = true; // Displays cookie Alert
  private showCookieAlertValue: string;

  dismissCookieAlert() {
    this.cookieService.set('new-user-cookie', 'false', 365);
    this.showCookieAlert = false;
  }

  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
    /* If cookieService.check() returns no cookie found, generate a cookie that expires in 365 days with a value of 'true' */
    if (this.cookieService.check('new-user-cookie') === false) {
      this.cookieService.set('new-user-cookie', 'true', 365);
    }

    this.showCookieAlertValue = this.cookieService.get('new-user-cookie'); /* Get cookie value */

    /* Toggle showCookieAlert boolean based on cookie value */
    if (this.showCookieAlertValue === 'true') {
      this.showCookieAlert = true;
    } else if (this.showCookieAlertValue === 'false') {
      this.showCookieAlert = false;
    } else {
      console.log('Error. New-user-cookie not found or initialized.');
    }
  }
}
