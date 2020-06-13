import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: [ './signing.component.css' ]
})

export class SigningComponent implements OnInit {
  public signingBoxText = '';
  // fonts and colors
  public currentFont = 'Arial';
  public backgroundColor = '#ffffff';
  public textColor = '#000000';

  selectFont(font: string) {
    this.currentFont = font;
  }
  makeBold(textbox: HTMLTextAreaElement) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    this.signingBoxText = text.slice(0, start) + '**' + text.slice(start, end) + '**' + text.slice(end);
    textbox.select();
  }
  makeItalics(textbox: HTMLTextAreaElement) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    this.signingBoxText = text.slice(0, start) + '*' + text.slice(start, end) + '*' + text.slice(end);
    textbox.select();
  }
  makeUnderline(textbox: HTMLTextAreaElement) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    this.signingBoxText = text.slice(0, start) + '<u>' + text.slice(start, end) + '</u>' + text.slice(end);
    textbox.select();
  }
  makeStrikethrough(textbox: HTMLTextAreaElement) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    this.signingBoxText = text.slice(0, start) + '~~' + text.slice(start, end) + '~~' + text.slice(end);
    textbox.select();
  }

  constructor() { }

  ngOnInit(): void { }
}
