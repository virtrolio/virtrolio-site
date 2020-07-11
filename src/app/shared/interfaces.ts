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
