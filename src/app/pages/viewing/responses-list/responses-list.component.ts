import { Component, Input, OnInit } from '@angular/core';
import { ViewingService } from '../../../core/viewing.service';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../../../core/auth.service';
import { VirtrolioMessage } from '../../../shared/interfaces';

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

  constructor(public viewService: ViewingService, private vps: ViewportScroller, public authService: AuthService) {
    try {
      this.uid = this.authService.uid();
    } catch (e) { }
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

  ngOnInit(): void { }

  /**
   * Toggle the state of the side nav menu
   */
  navToggle() {
    this.navIsOpen = !this.navIsOpen;
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
