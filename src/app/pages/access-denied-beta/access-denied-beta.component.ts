import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-access-denied-beta',
  templateUrl: './access-denied-beta.component.html',
  styleUrls: ['./access-denied-beta.component.css']
})
export class AccessDeniedBetaComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Beta Website Access Denied | Virtrolio');
  }

}
