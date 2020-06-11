import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../core/app-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(public authService: AppAuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('Logged in: ', this.isLoggedIn);
  }

}
