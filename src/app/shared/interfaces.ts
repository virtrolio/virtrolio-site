import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface VirtrolioMessageTemplate {
  backColor: string;
  contents: string;
  fontColor: string;
  fontFamily: string;
  from: string;
  to: string;
}

export interface VirtrolioDocument extends VirtrolioMessageTemplate {
  isRead: boolean;
  year: number;
  timestamp: Timestamp;
}

export interface VirtrolioMessage extends VirtrolioDocument {
  id: string;
}

export interface VirtrolioUser {
  key: string;
}
