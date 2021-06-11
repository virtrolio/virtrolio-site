import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ViewingService } from '../../../core/viewing.service';
import { AuthService } from '../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { VirtrolioMessage } from '../../../shared/interfaces/messages';

declare var $: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: [ './messages.component.css' ]
})

export class MessagesComponent implements OnInit, OnDestroy {
  messageList: VirtrolioMessage[] = [];
  oneMessage = 'messages';
  @Input() messageYears: Set<number>;
  yearSelected: number;
  @Output() yearSelectedChanged: EventEmitter<number> = new EventEmitter();

  constructor(public viewService: ViewingService, public authService: AuthService, private route: ActivatedRoute,
              private router: Router, private vps: ViewportScroller, private toastr: ToastrService,
              private modalService: NgbModal) {
  }

  /**
   * Assign messages passed via the [setMessageList] binding
   * @param messages list of verified VirtrolioMessages
   */
  @Input() set setMessageList(messages: VirtrolioMessage[]) {
    if (messages) {
      this.messageList = messages;
      // Set 'You have x message(s)' text based on number of messages
      this.messageList.length === 1 ? this.oneMessage = 'message' : this.oneMessage = 'messages';
    }
  }

  selectYear(): void {
    this.yearSelectedChanged.emit(this.yearSelected);
    this.viewService.isCarouselView = false;  // TODO: Switch to first carousel item instead of toggling to card view
  }

  ngOnInit(): void { }

  /**
   * Generate the lightness value of HSL from RBG
   */
  getLightness(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return (max + min) / 2;
  }

  ngOnDestroy(): void {
    $('#delete').modal('hide');
  }

  /**
   * Generate a darkened version of backColor, returning this new header color and the appropriate header text color
   * @param backColor: background color of the message
   */
  generateHeaderColor(backColor: string) {
    const bgR = parseInt(backColor.slice(1, 3), 16);
    const bgG = parseInt(backColor.slice(3, 5), 16);
    const bgB = parseInt(backColor.slice(5), 16);
    let headerTextColor: string;
    let trashIcon: string;
    let bookmarkIcon: string;
    let popupIcon: string;
    if (this.getLightness(bgR, bgG, bgB) > 0.65) {
      headerTextColor = '#000000';
      trashIcon = '../../../../assets/images/icons/trash-black.svg';
      bookmarkIcon = '../../../../assets/images/icons/bookmark-black.svg';
      popupIcon = '../../../../assets/images/icons/maximize-black.svg';
    } else {
      headerTextColor = '#FFFFFF';
      trashIcon = '../../../../assets/images/icons/trash-white.svg';
      bookmarkIcon = '../../../../assets/images/icons/bookmark-white.svg';
      popupIcon = '../../../../assets/images/icons/maximize-white.svg';
    }
    const hR = bgR + 20 > 255 ? 255 : bgR + 20;
    const hG = bgG + 20 > 255 ? 255 : bgG + 20;
    const hB = bgB + 20 > 255 ? 255 : bgB + 20;
    const headerColor = hR.toString(16) + hG.toString(16) + hB.toString(16);

    return { bg: '#' + headerColor, text: headerTextColor, trash: trashIcon, bookmark: bookmarkIcon, popup: popupIcon };
  }

  /**
   * Activate an NgbModal to display the selected message
   * @param msg VirtrolioMessage object
   */
  popupMessage(msg: VirtrolioMessage) {
    this.viewService.currentMessageModal = msg;
    this.modalService.open(MessageModalComponent, { centered: true });
  }

  /**
   * Swap between message viewing styles
   */
  toggleViewStyle() {
    this.viewService.isCarouselView = this.viewService.isCarouselView === false;
  }
}
