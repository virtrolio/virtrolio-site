import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { SigningService } from '../../core/signing.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: [ './signing.component.css' ]
})

/**
 * Controls user interaction with the signing box, updating the preview display and sending the message when they
 * click on the 'Send' button.
 */
export class SigningComponent implements OnInit {
  private uid: string;
  constructor(private route: ActivatedRoute, private authService: AuthService, public signService: SigningService) {
  }

  /**
   * Extract query parameters, maximum message length, fonts, and recipient username from appropriate services
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.uid = params.uid;
      this.signService.setUIDKey(this.uid, params.key);
    });
    this.authService.displayName(this.uid).then(userName => this.signService.setName(userName))
        .catch(error => alert(error));
    this.signService.resetDefaultValues();
  }
}
