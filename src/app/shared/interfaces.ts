export interface VirtrolioMessage {
  backColor: string;
  contents: string;
  fontColor: string;
  fontFamily: string;
  from: string;
  to: string;
  isRead: boolean;
  year: number;
}

export interface VirtrolioUser {
  key: string;
}
