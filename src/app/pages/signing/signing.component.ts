import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: [ './signing.component.css' ]
})

export class SigningComponent implements OnInit {
  public signingBoxText='';
  // default font is arial
  public currentFont='Arial';
  
  selectFont(font: string) {
    this.currentFont = font;
  }

  constructor() { }

  ngOnInit(): void { }

}
