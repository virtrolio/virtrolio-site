import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../viewing.service';
import { AuthService } from '../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.css' ]
})

export class MessagesComponent implements OnInit {
  messageToDelete: string;
  currentMessageId: string;
  isSingleMessageView = false;
  constructor(public viewService: ViewingService, public authService: AuthService, private route: ActivatedRoute,
              private router: Router, private vps: ViewportScroller, private toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.currentMessageId = params.messageId;
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.messageId) {
      this.isSingleMessageView = true;
    }
  }

  /**
   * Generate the lightness value of HSL from RBG
   */
  getLightness(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    return l;
  }

  /**
   * Generate a darkened version of backColor, returning this new header color and the appropriate header text color
   * @param backColor: background color of the message
   */
  generateHeaderColor(backColor: string) {
    const bgR = parseInt(backColor.slice(1, 3), 16);
    const bgG = parseInt(backColor.slice(3, 5), 16);
    const bgB = parseInt(backColor.slice(5), 16);
    let headerTextColor;
    if (this.getLightness(bgR, bgG, bgB) > 0.65) {
      headerTextColor = '#000000';
    } else {
      headerTextColor = '#FFFFFF';
    }
    const hR = bgR + 20 > 255 ? 255 : bgR + 20;
    const hG = bgG + 20 > 255 ? 255 : bgG + 20;
    const hB = bgB + 20 > 255 ? 255 : bgB + 20;
    const headerColor = hR.toString(16) + hG.toString(16) + hB.toString(16);

    return { bg: '#' + headerColor, text: headerTextColor };
  }

  /**
   * When you click 'x' on a message, messageToDelete will be assigned the value of that message's id
   * @param mID message id
   */
  setMessageToDelete(mID: string) {
    this.messageToDelete = mID;
  }

  /**
   * Wrapper around deleteMessage()
   */
  deleteMessage() {
    // noinspection JSIgnoredPromiseFromCall
    this.viewService.msgIo.deleteMessage(this.messageToDelete).then(() => {
      this.toastr.success('Message deleted successfully', 'Poof!');
    }).catch(e => {
      this.toastr.error('Message could not be deleted', 'Oops!');
    });
  }

  bookmarkMessage(id: string) {
    this.router.navigate(['/viewing'], {
      relativeTo: this.route,
      queryParams: {
        messageId: id
      },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * Scroll to the card with the given id and update the URL
   * @param id: id attribute of the card
   */
  showMessage(id) {
    console.log(id);
    this.vps.scrollToAnchor(id);
  }

  /**
   * Swap between message viewing styles
   */
  toggleViewStyle() {
    this.viewService.isCarouselView = this.viewService.isCarouselView === false;
  }
}
