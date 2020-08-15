import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from '../../core/auth.service';
import { Title } from '@angular/platform-browser';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  screenHeight: number;

  constructor(public authService: AuthService, private title: Title) {
    // Initialize Animate on Scroll library
    // In constructor instead of ngOnInit to avoid the page breaking when routerLinking to home
    AOS.init();
    this.getScreenSize();
  }

  /**
   * "Subscrbes" to the window resize event to update current value of viewport height
   */
  @HostListener('window:resize', [ '$event' ])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.title.setTitle('Virtrolio - Stay connected. Even when you\'re apart.');
  }

  /**
   * Scroll within page without linking to fragments
   */
  onClickChevron() {
    document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
  }
}
