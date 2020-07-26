import { Component, Input, OnInit } from '@angular/core';
import { ViewingService } from '../../../core/viewing.service';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../../../core/auth.service';
import { VirtrolioMessage } from '../../../shared/interfaces';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-responses-list',
  templateUrl: './responses-list.component.html',
  styleUrls: [ './responses-list.component.css' ]
})
export class ResponsesListComponent implements OnInit {
  public displayName: string;
  public photoUrl: string;
  public uid: string;
  navIsOpen = false;
  messageList: VirtrolioMessage[] = [];
  public showNewToViewing = true;
  private showNewToViewingValue: string;

  constructor(public viewService: ViewingService, private vps: ViewportScroller, public authService: AuthService,
              private cookieService: CookieService) {
    try {
      this.uid = this.authService.uid();
    } catch (e) {
       AuthService.displayError(e)
    }
    try {
      this.authService.displayName(this.uid).then((displayName) => { this.displayName = displayName; });
    } catch (e) {
      this.displayName = 'User';
    }
    try {
      this.authService.profilePictureLink(this.uid).then((photoUrl) => { this.photoUrl = photoUrl; });
    } catch (e) {
      // Use the logo as a fallback profile picture
      this.photoUrl = '../../../../assets/images/logo_reg.png';
    }
  }

  /**
   * Assign messages passed via the [setMessageList] binding
   * @param messages list of verified VirtrolioMessages
   */
  @Input() set setMessageList(messages: VirtrolioMessage[]) {
    if (messages) {
      this.messageList = messages;
    }
  }

  ngOnInit(): void {
    if (this.cookieService.check('viewing-cookie') === false) {
      this.cookieService.set('viewing-cookie', 'true', 365);
    }

    this.showNewToViewingValue = this.cookieService.get('viewing-cookie');

    if (this.showNewToViewingValue === 'true') {
      this.showNewToViewing = true;
    } else if (this.showNewToViewingValue === 'false') {
      this.showNewToViewing = false;
    } else {
      AuthService.displayError('Viewing-cookie not found or initialized properly.');
    }
  }

  /**
   * Toggle the state of the side nav menu
   */
  navToggle() {
    this.navIsOpen = !this.navIsOpen;
    if (this.showNewToViewing) {
      this.cookieService.set('viewing-cookie', 'false', 365);
      this.showNewToViewing = false;
    }
  }

  /**
   * Scroll to the card with the given id and update the URL
   * @param id: id attribute of the card
   */
  showMessage(id) {
    this.navToggle();
    if (!this.viewService.isCarouselView) {
      this.vps.scrollToAnchor(id);
    }
  }
}
