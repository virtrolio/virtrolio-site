import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: [ './signing.component.css' ]
})

export class SigningComponent implements OnInit {
  public signingBoxText = '';
  // fonts and colors
  public currentFont = 'Arial';
  public currentFontDisplay = 'Arial';
  public backgroundColor = '#ffffff';
  public textColor = '#000000';

  // Query params
  uid: string;
  key: string;


  selectFont(font: string) {
    this.currentFont = font;
    this.currentFontDisplay = font.slice(0, font.indexOf(','));
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
    console.log(this.uid);
    console.log(this.key);
  }

  // try to get query params from URL
  constructor(private route: ActivatedRoute) {
    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.key = params['key'];
    });
  }

  ngOnInit(): void { }
}
