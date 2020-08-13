import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

import changelog from './changelog.json';
import { ChangelogVersion } from '../../shared/interfaces';
import { AppComponent } from '../../app.component';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
  public changelog: ChangelogVersion[] = changelog;
  public beta = AppComponent.beta;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    /* Make hamburger menu collapse on item click */
    $('.navbar-nav>li>a').on('click', () => {
      $('.navbar-collapse').collapse('hide');
    });
  }
}
