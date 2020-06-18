import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-link',
  templateUrl: './friend-link.component.html',
  styleUrls: ['./friend-link.component.css']
})
export class FriendLinkComponent implements OnInit {
  uid: string;
  key: string;

  constructor(public authService: AuthService, private route: ActivatedRoute, private router: Router) {
    // Get uid and key params from URL
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.key = params['key'];
    });

    // Check key and redirect if key is false or invalid
    this.authService.checkKey(this.uid, this.key).then(validKey => {
      if (validKey === false) {
        this.router.navigate(['/invalid-link']);
      }
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/signing']);
      }
    })
    .catch(error => {
      this.router.navigate(['/invalid-link']);
    });
  }

  ngOnInit(): void { }

}