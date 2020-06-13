import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../core/app-auth.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  constructor(public authService: AppAuthService) {
  }

  ngOnInit(): void {
<<<<<<< HEAD
    console.log('from ngOnInit: ', this.authService.isLoggedIn());
    /* This is called onInit, and similar to the first few calls of 'isLoggedIn()' it returns true even when the user isn't signed in */
=======
>>>>>>> a3a3caace72bc4b4ba1c224c614612974c1cc502
  }

}
