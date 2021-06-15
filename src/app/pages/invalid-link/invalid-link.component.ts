import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-invalid-link',
  templateUrl: './invalid-link.component.html',
  styleUrls: ['./invalid-link.component.css'],
})
export class InvalidLinkComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle(
      "Invalid Sharing Link | Virtrolio - Stay connected. Even when you're apart."
    );
  }
}
