import firebase from 'firebase/app';
import 'firebase/firestore';
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
    fromName: string;
    fromPic: string;
    isRead: boolean;
    key: string;
    timestamp: Timestamp;
    year: number;
    images: string[];
}

export interface VirtrolioMessage extends VirtrolioDocument {
    id: string;
}
