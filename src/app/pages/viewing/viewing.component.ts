import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewingService } from './viewing.service';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-viewing',
  templateUrl: './viewing.component.html',
  styleUrls: [ './viewing.component.css' ]
})
export class ViewingComponent implements OnInit {
  isSingleMessageView = false;
  constructor(private route: ActivatedRoute, private viewService: ViewingService) {
  }

  ngOnInit(): void {
    this.viewService.nowMillis = Timestamp.now().toMillis();
    if (this.route.snapshot.queryParams.messageId) {
      this.isSingleMessageView = true;
    }
  }
}
