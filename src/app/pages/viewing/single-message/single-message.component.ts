import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../../../core/viewing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CommonService } from '../../../core/common.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firestore = firebase.firestore;
import Timestamp = firestore.Timestamp;
import { VirtrolioMessage, VirtrolioMessageTemplate } from '../../../shared/interfaces/messages';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: [ './single-message.component.css' ]
})
export class SingleMessageComponent implements OnInit {
  currentMessageId: string;
  showCloseButton = false;
  singleMessage: VirtrolioMessage = {
    ...new VirtrolioMessageTemplate(),
    from: '',
    fromName: '',
    fromPic: '',
    isRead: false,
    key: '',
    timestamp: new Timestamp(0, 0),
    year: 0,
    id: '',
  };
  imageList = ['https://bit.ly/3zhRL8v', 'https://bit.ly/3pBm2L7', 'https://bit.ly/3xiaT4d'];

  constructor(public viewService: ViewingService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
              private location: Location) {
    this.singleMessage.contents = 'Message is loading...';
    this.singleMessage.backColor = '#FFFFFF';
    this.singleMessage.fontColor = '#000000';
    this.singleMessage.fontFamily = 'Arial';
    this.route.queryParams.subscribe(params => {
      this.currentMessageId = params.messageId;
    });
    if (this.route.snapshot.queryParams.showBookmarkAlert) {
      this.toastr.info('This page can now be bookmarked so you can view this message later!', 'Bookmark',
        { positionClass: 'toast-bottom-full-width' });
      this.showCloseButton = true;
      this.location.go('/viewing', '?messageId=' + this.currentMessageId);
    }
  }

  ngOnInit(): void {
    this.viewService.msgIo.getMessage(this.currentMessageId).subscribe((message: VirtrolioMessage) => {
      try {
        this.viewService.msgIo.verifyMessage(message);
        this.singleMessage = message;
      } catch (e) {
        CommonService.displayError(e);
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate([ '/viewing' ]);
      }
    });
  }

  /**
   * Go to 'all messages' view
   */
  goToMessages() {
    this.router.navigate([ '/viewing' ]).then(() => {
      window.location.reload();
    });
  }
}
