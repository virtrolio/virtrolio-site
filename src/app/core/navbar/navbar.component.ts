import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import changelog from './changelog.json';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
  public changelog = changelog;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    /* Make hamburger menu collapse on item click */
    $('.navbar-nav>li>a').on('click', () => {
      $('.navbar-collapse').collapse('hide');
    });
  }
}
