import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../core/app-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService : AppAuthService) { }

  ngOnInit(): void {
  }

}
