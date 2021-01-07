import firebase from 'firebase/app';
import 'firebase/firestore';
import firestore = firebase.firestore;
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

export interface BetaUsers {
  users: string[];
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

export interface Contributor {
  name: string;
  images: {
    regular: string,
    silly: string
  };
  blurb: string;
  sharingLink: string;
  social: {
    github: string,
    instagram: string,
    linkedIn: string,
    website: string
  };
}

export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQSection {
  sectionTitle: string;
  questions: FAQQuestion[];
}

export interface ChangelogItem {
  type: string;
  typeCSS: string;
  betaFlag: boolean;
  location: string;
  content: string;
}

export interface ChangelogVersion {
  versionNumber: string;
  releaseDate: string;
  betaUpdate: boolean;
  items: ChangelogItem[];
}
