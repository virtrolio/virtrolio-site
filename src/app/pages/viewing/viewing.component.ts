import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewingService } from './viewing.service';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { VirtrolioMessage } from '../../shared/interfaces';

@Component({
  selector: 'app-viewing',
  templateUrl: './viewing.component.html',
  styleUrls: [ './viewing.component.css' ]
})
export class ViewingComponent implements OnInit {
  isSingleMessageView = false;
  messageList: VirtrolioMessage[];

  constructor(private route: ActivatedRoute, private viewService: ViewingService) {
  }

  ngOnInit(): void {
    // Get the current time to use as time since reference
    this.viewService.nowMillis = Timestamp.now().toMillis();
    // Determine if the viewing link has messageId query param
    if (this.route.snapshot.queryParams.messageId) {
      this.isSingleMessageView = true;
    }
    this.viewService.msgIo.getMessages().subscribe((messages: VirtrolioMessage[]) => {
      this.messageList = [];
      messages.forEach((message) => {
        try {
          // Add message to messageList if verifyMessage succeeds
          this.viewService.msgIo.verifyMessage(message);
          this.messageList.push(message);
        } catch (e) {
          console.log(e);
        }
      });
    });
  }
}
