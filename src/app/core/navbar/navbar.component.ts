import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';

import changelog from './changelog.json';
import { AppComponent } from '../../app.component';
import { ChangelogVersion } from '../../shared/interfaces/changelog';
import { Event, NavigationStart, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  public changelog: ChangelogVersion[] = changelog;
  public beta = AppComponent.beta;

  constructor(public authService: AuthService, private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        $('#changelog').modal('hide');
      }
    });
  }

  ngOnInit(): void {
    /* Make hamburger menu collapse on item click */
    $('.navbar-nav>li>a').on('click', () => {
      $('.navbar-collapse').collapse('hide');
    });
  }

  ngOnDestroy(): void {
    $('#changelog').modal('hide');
  }
}
