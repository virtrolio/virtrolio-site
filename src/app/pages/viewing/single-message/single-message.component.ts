import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../viewing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: [ './single-message.component.css' ]
})
export class SingleMessageComponent implements OnInit {
  currentMessageId: string;

  constructor(public viewService: ViewingService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.currentMessageId = params.messageId;
    });
  }

  ngOnInit(): void {
    this.viewService.getMessageById(this.currentMessageId);
  }
}
