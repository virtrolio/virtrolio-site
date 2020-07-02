import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from '../../core/auth.service';
import { SigningService } from '../../core/signing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  // Default blank textbox
  inputBoxText = '';
  constructor(public authService: AuthService, public signingService: SigningService) { }

  ngOnInit(): void {
    // Initialize Animate on Scroll library
    AOS.init();
    this.signingService.setHomeDefaultValues();
  }

  /**
   * When user starts typing, assign inputBoxText by reference to signingBoxText, then update count
   * @param textbox
   */
  keyup(textbox: HTMLTextAreaElement) {
    this.signingService.signingBoxText = this.inputBoxText;
    this.signingService.updateCount(textbox);
  }
}
