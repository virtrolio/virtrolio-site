import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewingService } from '../../core/viewing.service';
import { VirtrolioMessage } from '../../shared/interfaces';
import { Title } from '@angular/platform-browser';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firestore = firebase.firestore;
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-viewing',
  templateUrl: './viewing.component.html',
  styleUrls: [ './viewing.component.css' ]
})
export class ViewingComponent implements OnInit {
  isSingleMessageView = false;
  messageList: VirtrolioMessage[];
  filteredMessageList: VirtrolioMessage[];
  invalidMessageCount = 0;
  messageYears: Set<number> = new Set();
  @ViewChild('messages') messages;

  constructor(private route: ActivatedRoute, private viewService: ViewingService, private title: Title) { }

  filterMessages(year: number): void {
    this.filteredMessageList = this.messageList.filter(message => message.year == year);
    // TODO: Change loose to strict equality; prevent strings from being passed in
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
      const messageYearsArray: number[] = [];
      messages.forEach((message) => {
        try {
          // Add message to messageList if verifyMessage succeeds
          this.viewService.msgIo.verifyMessage(message);
          this.messageList.push(message);
          messageYearsArray.push(message.year);
        } catch (e) {
          this.invalidMessageCount += 1;
        }
      });

      this.messageYears = new Set(messageYearsArray.sort().reverse());  // Convert to set to remove duplicates
      this.filterMessages(this.messages.yearSelected);
    });
  }
}
