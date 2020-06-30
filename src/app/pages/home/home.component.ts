import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from '../../core/auth.service';
import { FontService } from '../../core/font.service';
import { Fonts } from '../../shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  /** Default values */
  public cardText = 'University across the country, huh? I don\'t know what I\'m going to do without you next year. I\'ll call you whenever I can. Until I see you again! :heart:';
  public signingBoxText;
  public backgroundColor = `#fa8072`;
  public textColor = '#FFFFFF';
  public canSend = false;
  public charCount = 0;
  public maxCharCount: 5000;
  public charCountColor = '#bbbbbb';
  public name = '[friend name]';

  // font service stuff
  public currentFont = 'Arial, sans-serif';
  public currentFontDisplay = 'Arial';
  public fontDict: Fonts;

  constructor(public authService: AuthService) {
    this.fontDict = FontService.fonts;
  }

  ngOnInit(): void {
    // Initialize Animate on Scroll library
    AOS.init();
  }

  /**
   * @param font - Font selected from dropdown menu
   */
  selectFont(font: string) {
    this.currentFont = font + ',' + this.fontDict[font].backupFont;
    this.currentFontDisplay = this.fontDict[font].fontFamily;
  }

  /**
   * The following functions add text formatting characters around selected text within textbox.
   * @param textbox - textbox in which user types.
   * @param formatCharacters - formatting character(s) to be placed around the selected text
   */
  addFormatting(textbox: HTMLTextAreaElement, formatCharacters: string) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    this.signingBoxText = text.slice(0, start) + formatCharacters + text.slice(start, end) + formatCharacters + text.slice(end);
    this.updateCount(textbox);
    textbox.select();
  }

  /**
   * Update character count value and text colour
   * @param textbox - textbox in which user types.
   */
  updateCount(textbox: HTMLTextAreaElement) {
    this.cardText = this.signingBoxText;
    this.charCount = textbox.value.length;
    this.charCountColor = (this.charCount > this.maxCharCount) ? '#EE1111' : '#b0b0b0';
    this.canSend = (0 < this.charCount && this.charCount <= this.maxCharCount);
  }

}
