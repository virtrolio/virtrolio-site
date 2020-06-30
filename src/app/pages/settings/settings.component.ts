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
  downloadMessagesData;
  downloadUserData;

  constructor(private authService: AuthService, private msgIoService: MsgIoService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  /**
   * Converts the user's data and messages into JSONs and changes the href of their respective buttons to permit
   * downloading of the data.
   */
  async generateDownloads() {
    const messages = await this.msgIoService.getMessages().pipe(take(1)).toPromise();
    const userData = await this.authService.getUserData();
    const messagesJSON = JSON.stringify(messages, null, 2);
    const userJSON = JSON.stringify(userData, null, 2);
    this.downloadMessagesData = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(messagesJSON));
    this.downloadUserData = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(userJSON));
  }

}
