import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import contributors from './contributors.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: [ './about.component.css' ]
})

/**
 * About component, with a short blurb at the top and a row for each contributor.
 */
export class AboutComponent implements OnInit {
  public contributors = contributors;

  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('About Us | Virtrolio');
  }

}
