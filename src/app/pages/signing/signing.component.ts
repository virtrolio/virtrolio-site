import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgIoService } from '../../core/msg-io.service';
import { AuthService } from 'src/app/core/auth.service';
import { FontService } from 'src/app/core/font.service';
import { Fonts } from '../../shared/interfaces';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: [ './signing.component.css' ]
})

/**
 * Controls user interaction with the signing box, updating the preview display and sending the message when they
 * click on the 'Send' button.
 */
export class SigningComponent implements OnInit {
  /** Default values */
  public signingBoxText = '';
  public backgroundColor = '#ffffff';
  public textColor = '#000000';
  public canSend = false;
  public charCount = 0;
  public maxCharCount: number;
  public charCountColor = '#bbbbbb';
  public name = '[friend name]';

  private uid: string;
  private key: string;

  // font service stuff
  public currentFont = 'Arial'; // Used to select a font from fontDict
  public currentFontFamily = 'Arial'; // Used to CSS select the font
  public currentFontDisplay = 'Arial'; // Shown in the Font Dropdown menu
  public fontDict: Fonts;

  constructor(private route: ActivatedRoute, private authService: AuthService, private msgIo: MsgIoService,
              private router: Router) {
    this.fontDict = FontService.fonts;
  }

  /**
   * Extract query parameters, maximum message length, fonts, and recipient username from appropriate services
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.uid = params.uid;
      this.key = params.key;
    });
    this.maxCharCount = MsgIoService.maxMessageLength;
    this.authService.displayName(this.uid).then(userName => this.name = userName).catch(error => alert(error));
  }

  /**
   * @param font - Font selected from dropdown menu
   */
  selectFont(font: string) {
    this.currentFont = font;
    this.currentFontFamily = font + ',' + this.fontDict[font].backupFont;
    this.currentFontDisplay = this.fontDict[font].fontFamily;
  }

  /**
   * The following functions add text formatting characters around selected text within textbox.
   * @param textbox - textbox in which user types.
   * @param formatCharacters - formatting character(s) to be placed around the selected text
   * @param endCharacter - Optional - The ending character, if different from the starting character
   */
  addFormatting(textbox: HTMLTextAreaElement, formatCharacters: string, endCharacter?: string) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;

    // If the end character was not provided, we assume it will be the same as the start character
    if (typeof endCharacter === 'undefined' || !endCharacter) {
      endCharacter = formatCharacters;
    }

    this.signingBoxText = text.slice(0, start) + formatCharacters + text.slice(start, end) + endCharacter +
      text.slice(end);
    textbox.select();
  }

  /**
   * Update character count value and text colour
   * @param textbox - textbox in which user types.
   */
  updateCount(textbox: HTMLTextAreaElement) {
    this.charCount = textbox.value.length;
    this.charCountColor = (this.charCount > this.maxCharCount) ? '#EE1111' : '#b0b0b0';
    this.canSend = (0 < this.charCount && this.charCount <= this.maxCharCount);
  }

  /**
   * Creates a new blank message and fills in all the info before sending it
   * @param textbox - the textbox where the contents of the message are retrieved from (not the preview box)
   */
  createMsg(textbox: HTMLTextAreaElement) {
    const newMsg = this.msgIo.createBlankMessage();
    newMsg.backColor = this.backgroundColor;
    newMsg.fontColor = this.textColor;
    newMsg.fontFamily = this.currentFont;
    newMsg.contents = textbox.value;
    newMsg.to = this.uid;

    this.msgIo.sendMessage(newMsg, this.key).then(() =>
      this.router.navigate([ '/msg-sent' ]))
      .catch(error => alert(error));
  }

}
