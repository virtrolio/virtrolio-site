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
  title = 'virtrolio-site';
  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
    /* Show cookie footer without backdrop */
    // $('#cookieModal').modal({
    //   backdrop: false,
    // });
  }
}
