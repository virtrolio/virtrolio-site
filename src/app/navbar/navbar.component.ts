import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../core/app-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AppAuthService) { }

  ngOnInit(): void { }

}
