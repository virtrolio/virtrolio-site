import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend-link',
  templateUrl: './signing-auth-redirect.component.html',
  styleUrls: [ './signing-auth-redirect.component.css' ]
})
export class SigningAuthRedirectComponent implements OnInit {
  uid: string;
  key: string;

  goToSigning() {
    // noinspection JSIgnoredPromiseFromCall
    this.authService.login('signing', { uid: this.uid, key: this.key });
  }

  constructor(public authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.uid = params.uid;
      this.key = params.key;
    });
  }
}
