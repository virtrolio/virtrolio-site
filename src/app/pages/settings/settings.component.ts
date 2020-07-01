import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { MsgIoService } from '../../core/msg-io.service';
import { take } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.css' ]
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService, private msgIoService: MsgIoService, private sanitizer: DomSanitizer) { }
  downloadMessagesData;
  downloadUserData;

  private static decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  ngOnInit(): void { }

  /**
   * Converts the user's data and messages into JSONs and changes the href of their respective buttons to permit
   * downloading of the data.
   */
  async generateDownloads() {
    // Get data
    const messages = await this.msgIoService.getMessages().pipe(take(1)).toPromise();
    const userData = await this.authService.getUserData();
    // Convert encoded text to normal text
    messages.forEach(message => {
      message.contents = SettingsComponent.decodeHtml(message.contents);
    });
    // Convert data to JSON
    const messagesJSON = JSON.stringify(messages, null, 2);
    const userJSON = JSON.stringify(userData, null, 2);
    // Set download buttons
    this.downloadMessagesData = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(messagesJSON));
    this.downloadUserData = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(userJSON));
  }

}
