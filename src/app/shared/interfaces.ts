import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface VirtrolioMessageTemplate {
  backColor: string;
  contents: string;
  fontColor: string;
  fontFamily: string;
  to: string;
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
  key: string;
}
