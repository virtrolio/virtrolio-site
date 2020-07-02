import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from '../../core/auth.service';
import { SigningService } from '../../core/signing.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

  // Default blank textbox
  inputBoxText = '';
  constructor(public authService: AuthService, public signingService: SigningService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Virtrolio - Stay connected. Even when you\'re apart.');
    // Initialize Animate on Scroll library
    AOS.init();
    this.signingService.setHomeDefaultValues();
  }

  /**
   * When user starts typing, assign inputBoxText by reference to signingBoxText, then update count
   * @param textbox - The textbox to process.
   */
  keyup(textbox: HTMLTextAreaElement) {
    this.signingService.signingBoxText = this.inputBoxText;
    this.signingService.updateCount(textbox);
  }
}
