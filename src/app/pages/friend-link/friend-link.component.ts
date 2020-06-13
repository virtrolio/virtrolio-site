import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../core/app-auth.service';

@Component({
  selector: 'app-friend-link',
  templateUrl: './friend-link.component.html',
  styleUrls: [ './friend-link.component.css' ]
})
export class FriendLinkComponent implements OnInit {

  constructor(public authService: AppAuthService) { }

  ngOnInit(): void { }

}

/* *ngIf="authService.isLoggedIn()" */
