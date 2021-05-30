import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewingService } from '../../core/viewing.service';
import { Title } from '@angular/platform-browser';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firestore = firebase.firestore;
import Timestamp = firestore.Timestamp;
import { VirtrolioMessage } from '../../shared/interfaces/messages';
import { CommonService } from '../../core/common.service';

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
  currentYear: number = (new Date()).getFullYear();
  @ViewChild('messages') messages;

  constructor(private route: ActivatedRoute, private viewService: ViewingService, private title: Title) { }

  filterMessages(year: string): void {
    this.filteredMessageList = this.messageList.filter(message => message.year === parseInt(year, 10));
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

      if (this.messageList.length === 0) {
        this.messages.yearSelected = this.currentYear;
        return;
      }

      this.messageYears = new Set(messageYearsArray.sort().reverse());  // Sort and convert to set to remove duplicates

      // Default to current year for filtering if messages exist, else pick the most recent year within the message list
      console.log(this.messageYears);
      if (this.messageYears.has(this.currentYear)) {
        this.messages.yearSelected = this.currentYear;
      } else if (this.messageYears.size !== 0) {
        this.messages.yearSelected = Array.from(this.messageYears)[0];
      } else {
        CommonService.displayError('Error selecting year for message filtering.');
      }

      this.filterMessages(this.messages.yearSelected);
    });
  }
}
