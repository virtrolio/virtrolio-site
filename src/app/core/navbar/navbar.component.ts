import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
  photoUrl: string;
  constructor(public authService: AuthService) {
    try {
      this.authService.profilePictureLink(this.authService.uid()).then((photoUrl) => {this.photoUrl = photoUrl; });
    } catch (e) {
      // Fallback profile pic using our logo
      this.photoUrl = '../../../assets/images/logo_reg.png';
    }
  }

  ngOnInit(): void {
    /* Make hamburger menu collapse on item click */
    $('.navbar-nav>li>a').on('click', () => {
      $('.navbar-collapse').collapse('hide');
    });
  }
}
