import { Component, OnInit } from '@angular/core';

// noinspection JSUnusedLocalSymbols
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit {
  title = 'virtrolio-site';

  ngOnInit(): void {
    /* Show cookie footer without backdrop */
    // $('#cookieModal').modal({
    //   backdrop: false,
    // });
  }
}
