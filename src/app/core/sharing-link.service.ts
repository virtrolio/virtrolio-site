import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingLinkService {
  static readonly keyLength = 7;
  static readonly keyOptions = 'qwertyuipasdfghjkzxcvbnmQWERTYUPASDFGHJKLZXCVBNM123456789';

  constructor() { }

  /**
   * Generates a random string of characters of length AppAuthService.keyLength using the characters in
   * AppAuthService.keyOptions.
   */
  static generateKey(): string {
    let key = '';
    for (let i = 0; i < SharingLinkService.keyLength; i++) {
      key += SharingLinkService.keyOptions.charAt(Math.floor(Math.random() * SharingLinkService.keyOptions.length));
    }
    return key;
  }
}
