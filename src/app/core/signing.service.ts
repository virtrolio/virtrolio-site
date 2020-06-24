import { Injectable } from '@angular/core';
import { Fonts } from '../shared/interfaces';
import { MsgIoService } from './msg-io.service';
import { FontService } from './font.service';

@Injectable({
  providedIn: 'root'
})
export class SigningService {
  public signingBoxText;
  public backgroundColor;
  public textColor;
  public canSend;
  public charCount;
  public maxCharCount: number;
  public charCountColor;

  // Font service variables
  public currentFont; // Used to select a font from fontDict
  public currentFontFamily; // Used to CSS select the font
  public currentFontDisplay; // Shown in the Font Dropdown menu
  public fontDict: Fonts;

  constructor() {
    this.fontDict = FontService.fonts;
    this.maxCharCount = MsgIoService.maxMessageLength;
  }

  /**
   * Sets all class variables to their default values
   */
  resetDefaultValues() {
    this.signingBoxText = '';
    this.backgroundColor = '#ffffff';
    this.textColor = '#000000';
    this.canSend = false;
    this.charCount = 0;
    this.charCountColor = '#bbbbbb';
    this.currentFont = 'Arial'; 
    this.currentFontFamily = 'Arial, sans-serif'; 
    this.currentFontDisplay = 'Arial'; 
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
}
