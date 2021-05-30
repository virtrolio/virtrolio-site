import { Injectable, SecurityContext } from '@angular/core';
import { MsgIoService } from './msg-io.service';
import { FontService } from './font.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Fonts } from '../shared/interfaces/fonts';

@Injectable({
  providedIn: 'root'
})
export class SigningService {
  signingBoxText: string;
  sanitizedText: string;
  backgroundColor: string;
  textColor: string;
  canSend: boolean;
  charCount: number;
  maxCharCount: number;
  charCountColor: string;

  // Font service variables
  fontDict: Fonts; // Used to store all of the fonts
  currentFont: string; // Used to select a font from fontDict
  currentFontFamily: string; // Used to CSS select the font
  currentFontDisplay: string; // Shown in the Font Dropdown menu

  constructor(private sanitizer: DomSanitizer) {
    this.fontDict = FontService.fonts;
    this.maxCharCount = MsgIoService.maxMessageLength;
  }

  /**
   * Sets all class variables to their default values
   */
  resetDefaultValues() {
    this.signingBoxText = '';
    this.sanitizedText = '';
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
   * Adds markdown formatting characters around selected text within textbox.
   * @param textbox - textbox in which user types.
   * @param formatChars - formatting character(s) to be placed around the selected text
   * @param endChars - Optional - The ending character, if different from the starting character
   */
  addFormatting(textbox: HTMLTextAreaElement, formatChars: string, endChars?: string) {
    const start = textbox.selectionStart;
    const end = textbox.selectionEnd;
    const text = textbox.value;
    const scrollPos: number = textbox.scrollTop;

    // If the end character was not provided, we assume it will be the same as the start character
    if (typeof endChars === 'undefined' || !endChars) {
      endChars = formatChars;
    }
    textbox.value = this.signingBoxText = text.slice(0, start) + formatChars + text.slice(start, end) + endChars +
      text.slice(end);

    // timeout so that it sets the selection range AFTER the textbox is modified
    setTimeout(() => {
      textbox.focus();
      textbox.scrollTop = scrollPos;
      // special case for underline or if no text was highlighted
      // underline should always be on the outside (since it's html instead of markdown)
      if (formatChars === '<u>' || start === end) {
        textbox.setSelectionRange(start + formatChars.length, end + formatChars.length);
      }
      // otherwise keep the text highlighted
      else {
        textbox.setSelectionRange(start, end + formatChars.length + endChars.length);
      }
    }, 0);
  }

  /**
   * Update character count value and text colour
   * @param textbox - textbox in which user types.
   */
  updateCount(textbox: HTMLTextAreaElement) {
    this.sanitizedText = this.sanitizer.sanitize(SecurityContext.HTML, this.signingBoxText);
    this.charCount = this.sanitizedText.length;
    this.charCountColor = (this.charCount > this.maxCharCount) ? '#EE1111' : '#b0b0b0';
    this.canSend = (0 < this.charCount && this.charCount <= this.maxCharCount);
  }
}
