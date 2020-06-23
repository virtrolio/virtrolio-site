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
  fromName: string;
  fromPic: string;
}

export interface VirtrolioMessage extends VirtrolioDocument {
  id: string;
}

export interface VirtrolioUser {
  displayName: string;
  key: string;
  profilePic: string;
}

export class Font {
  fontFamily: string;
  backupFont: string;
  normalWeight: number;
  boldWeight: number;
  doubleBoldWeight: number;

  constructor(fontFamily, backupFont, normalWeight = 400, boldWeight = 700, doubleBoldWeight = 900) {
    this.fontFamily = fontFamily;
    this.backupFont = backupFont;
    this.normalWeight = normalWeight;
    this.boldWeight = boldWeight;
    this.doubleBoldWeight = doubleBoldWeight;
  }
}

export interface Fonts {
  [key: string]: Font;
}

export class AboutPagePictures {
  name: string;
  regularLink: string;
  sillyLink: string;
  showSilly: boolean;

  constructor(name: string, regularLink: string, sillyLink: string) {
    this.name = name;
    this.regularLink = regularLink;
    this.sillyLink = sillyLink;
    this.showSilly = true;
  }
}
