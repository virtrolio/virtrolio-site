import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: [ './signing.component.css' ]
})

export class SigningComponent implements OnInit {
  public signingBoxText = '';
  // default font is arial
  public currentFont = 'Arial';
  selectFont(font: string) {
    this.currentFont = font;
  }

  makeBold(textbox: HTMLInputElement) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    this.signingBoxText = text.slice(0, start) + '**' + text.slice(start, end) + '**' + text.slice(end);
    textbox.select();
    textbox.setSelectionRange(start - 2, end + 2);
  }

  makeItalics(textbox: HTMLInputElement) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    this.signingBoxText = text.slice(0, start) + '*' + text.slice(start, end) + '*' + text.slice(end);
    textbox.select();
    textbox.setSelectionRange(start - 1, end + 1);
  }

  makeUnderline(textbox: HTMLInputElement) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    this.signingBoxText = text.slice(0, start) + '<u>' + text.slice(start, end) + '</u>' + text.slice(end);
    textbox.select();
    textbox.setSelectionRange(start - 3, end + 4);
  }

  makeStrikethrough(textbox: HTMLInputElement) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    this.signingBoxText = text.slice(0, start) + '~~' + text.slice(start, end) + '~~' + text.slice(end);
    textbox.select();
    textbox.setSelectionRange(start - 2, end + 2);
  }


  constructor() { }

  ngOnInit(): void { }
}
