import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-msg-sent',
  templateUrl: './msg-sent.component.html',
  styleUrls: [ './msg-sent.component.css' ]
})
export class MsgSentComponent implements OnInit {
  public name = 'Your friend';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params.name;
    });
  }

}
