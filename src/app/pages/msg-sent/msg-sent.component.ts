import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-msg-sent',
  templateUrl: './msg-sent.component.html',
  styleUrls: ['./msg-sent.component.css'],
})
export class MsgSentComponent implements OnInit {
  public name = 'Your friend';

  constructor(private route: ActivatedRoute, private title: Title) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.name = params.name;
      this.title.setTitle(
        'Message sent to ' +
          params.name +
          "! | Virtrolio - Stay connected. Even when you're apart."
      );
    });
  }
}
