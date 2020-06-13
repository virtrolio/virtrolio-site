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

  deleteCookie() {
    this.cookieService.delete('new-user-cookie');
    console.log('Cookie deleted: ', this.cookieService.check('new-user-cookie'));
  }

  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
    if (this.cookieService.check('new-user-cookie') === false) {
      this.cookieService.set('new-user-cookie', 'true', 365);
      console.log('Changing from initial');
    }

    console.log('Cookie value: ', this.cookieService.get('new-user-cookie'));

    if (this.cookieService.get('new-user-cookie') === 'true') {
      /* Show cookie footer without backdrop */
      $('#cookieModal').modal({
        backdrop: false,
      });
      this.cookieService.set('new-user-cookie', 'false');
    }
  }
}
