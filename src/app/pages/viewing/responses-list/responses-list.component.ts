import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../viewing.service';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-responses-list',
  templateUrl: './responses-list.component.html',
  styleUrls: [ './responses-list.component.css' ]
})
export class ResponsesListComponent implements OnInit {
  public displayName;
  public photoUrl;
  public uid;

  constructor(public viewService: ViewingService, private vps: ViewportScroller, public authService: AuthService) {
    try {
      this.uid = this.authService.uid();
      console.log(this.uid);
    } catch (e) { }
    try {
      this.authService.displayName(this.uid).then((displayName) => {this.displayName = displayName; });
    } catch (e) {
      this.displayName = 'User';
    }
    try {
      this.authService.profilePictureLink(this.uid).then((photoUrl) => {this.photoUrl = photoUrl; });
    } catch (e) {
      // Use the logo as a fallback profile picture
      this.photoUrl = '../../../../assets/images/logo_reg.png';
    }
  }

  ngOnInit(): void { }

  /**
   * Scroll to the card with the given id
   * @param id: id attribute of the card
   */
  showMessage(id) {
    if (this.viewService.isCardView) {
      this.vps.scrollToAnchor(id);
    }
  }
}
