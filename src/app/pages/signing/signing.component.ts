import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public currentFont = 'Arial, sans-serif';
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
      this.charCountColor = '#EE1111';
    }
    else {
      this.charCountColor = '#b0b0b0';
    }
    // basic checker for whether or not the user can sign/send the message
    if (0 < this.charCount && this.charCount <= 5000) {
      this.canSend = true;
    }
    else {
      this.canSend = false;
    }
  }

  /**
   * Creates a new blank message and fills in all the info before sending ti
   * @param textbox - the textbox where the contents of the message are retrieved from (not the preview box)
   */
  createMsg(textbox: HTMLTextAreaElement) {
    const newMsg = this.msgIo.createBlankMessage();
    newMsg.backColor = this.backgroundColor;
    newMsg.fontColor = this.textColor;
    newMsg.fontFamily = this.currentFont;
    newMsg.contents = textbox.value;
    newMsg.to = this.uid;

    this.msgIo.sendMessage(newMsg, this.key).then(() => this.router.navigate(['/msg-sent'])).catch(error => alert(error));
  }

  // try to get query params from URL
  constructor(private route: ActivatedRoute, private msgIo: MsgIoService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'];
      this.key = params['key'];
    });

    // set max message length
    this.maxCharCount = MsgIoService.maxMessageLength;
  }

  ngOnInit(): void { }
}
