import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewingService } from '../../core/viewing.service';
import { firestore } from 'firebase/app';
import { VirtrolioMessage } from '../../shared/interfaces';
import { Title } from '@angular/platform-browser';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-viewing',
  templateUrl: './viewing.component.html',
  styleUrls: [ './viewing.component.css' ]
})
export class ViewingComponent implements OnInit {
  isSingleMessageView = false;
  messageList: VirtrolioMessage[];

  constructor(private route: ActivatedRoute, private viewService: ViewingService, private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('View Your Messages | Virtrolio');
    // Determine if the viewing link has messageId query param
    if (this.route.snapshot.queryParams.messageId) {
      this.isSingleMessageView = true;
    }
    this.viewService.msgIo.getMessages().subscribe((messages: VirtrolioMessage[]) => {
      // Get the current time to use as time since reference
      this.viewService.nowMillis = Timestamp.now().toMillis();
      // Clear the messageList
      this.messageList = [];
      messages.forEach((message) => {
        try {
          // Add message to messageList if verifyMessage succeeds
          this.viewService.msgIo.verifyMessage(message);
          this.messageList.push(message);
        } catch (e) { }
      });
    });
  }
}
