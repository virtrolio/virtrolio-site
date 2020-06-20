import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    AOS.init();
  }

}
