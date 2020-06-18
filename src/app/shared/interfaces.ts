import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export class VirtrolioMessageTemplate {
  backColor = '';
  contents = '';
  fontColor = '';
  fontFamily = '';
  to = '';
}

export interface VirtrolioDocument extends VirtrolioMessageTemplate {
  from: string;
  isRead: boolean;
  year: number;
  timestamp: Timestamp;
}

export interface VirtrolioMessage extends VirtrolioDocument {
  id: string;
}

export interface VirtrolioUser {
  displayName: string;
  key: string;
}

export class Font {
  fontFamily: string;
  backupFont: string;
  displayName: string;
  normalWeight: number;
  boldWeight: number;
  doubleBoldWeight: number;

  constructor(fontFamily, backupFont, displayName, normalWeight = 400, boldWeight = 700, doubleBoldWeight = 900) {
    this.fontFamily = fontFamily;
    this.backupFont = backupFont;
    this.displayName = displayName;
    this.normalWeight = normalWeight;
    this.boldWeight = boldWeight;
    this.doubleBoldWeight = doubleBoldWeight;
  }
}
