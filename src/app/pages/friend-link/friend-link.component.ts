import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-friend-link',
  templateUrl: './friend-link.component.html',
  styleUrls: [ './friend-link.component.css' ]
})
export class FriendLinkComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void { }

}
