import { Component, OnInit } from '@angular/core';
import { ViewingService } from '../../core/viewing.service';

@Component({
  selector: 'app-responses-list',
  templateUrl: './responses-list.component.html',
  styleUrls: ['./responses-list.component.css']
})
export class ResponsesListComponent implements OnInit {
  userMsgData;
  constructor(private viewingService: ViewingService) {}

  ngOnInit(): void {
    this.userMsgData = this.viewingService.userMsgData;
    console.log(this.userMsgData);
  }

}
