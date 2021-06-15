import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rejecc',
  templateUrl: './rejecc.component.html',
  styleUrls: ['./rejecc.component.css'],
})
export class RejeccComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('You seem familiar... | Virtrolio');
  }
}
