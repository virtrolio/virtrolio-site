import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsgIoService } from '../../core/msg-io.service';

declare var $: any;

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})

export class SigningComponent implements OnInit {
  public signingBoxText = '';
  // fonts and colors for the textboxes
  public currentFont = 'Arial';
  public currentFontDisplay = 'Arial';
  public backgroundColor = '#ffffff';
  public textColor = '#000000';
  public canSend = false;

  // colors and values for the character counter
  public charCount = 0;
  public maxCharCount = 5000;
  public charCountColor = '#bbbbbb';

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
  }

  // updates the character count and colour
  updateCount(textbox: HTMLTextAreaElement) {
    this.charCount = textbox.value.length;
    if (this.charCount > this.maxCharCount) {
      this.charCountColor = '#DD1111';
    }
    else {
      this.charCountColor = '#b0b0b0';
    }

  }

  // try to get query params from URL
  constructor(private route: ActivatedRoute, private msgIo: MsgIoService) {
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.key = params['key'];
    });

    // set max message length
    this.maxCharCount = MsgIoService.maxMessageLength;
  }

  ngOnInit(): void { }
}
