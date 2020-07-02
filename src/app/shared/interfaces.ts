import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class VirtrolioMessageTemplate {
  backColor = '';
  contents = '';
  fontColor = '';
  fontFamily = '';
  to = '';
}

export interface VirtrolioDocument extends VirtrolioMessageTemplate {
  from: string;
  fromName: string;
  fromPic: string;
  isRead: boolean;
  key: string;
  timestamp: Timestamp;
  year: number;
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

  constructor(fontFamily, backupFont) {
    this.fontFamily = fontFamily;
    this.backupFont = backupFont;
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
