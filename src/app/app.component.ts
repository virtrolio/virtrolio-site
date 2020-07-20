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
 */
export class AppComponent implements OnInit {
  public title = 'virtrolio-site';

  constructor(public cookieService: CookieService) { }

  ngOnInit(): void {
    // Generate new-user-cookie if it does not exist
    if (this.cookieService.check('new-user-cookie') === false) {
      this.cookieService.set('new-user-cookie', 'true', 365);
    }
  }
}
