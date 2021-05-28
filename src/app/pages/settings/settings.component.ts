import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { MsgIoService } from '../../core/msg-io.service';
import { take } from 'rxjs/operators';
import { DomSanitizer, Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.css' ]
})
export class SettingsComponent implements OnInit, OnDestroy {
  downloadMessagesData;
  downloadUserData;
  exportErrorText: string;

  constructor(public authService: AuthService, private msgIoService: MsgIoService, private sanitizer: DomSanitizer, private title: Title) {
  }

  private static decodeHtml(html: string) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  ngOnInit(): void {
    this.title.setTitle('Settings | Virtrolio');
  }

  ngOnDestroy(): void {
    $('#download').modal('hide');
    $('#download-error').modal('hide');
    $('#delete-error').modal('hide');
  }

  /**
   * Converts the user's data and messages into JSONs and changes the href of their respective buttons to permit
   * downloading of the data.
   */
  async generateDownloads() {
    const downloadModal = $('#download');
    const exportErrorModal = $('#download-error');
    try {
      // Get data
      // Looser types is to allow the message array to be replaced with a single error if there are no messages
      let messages: Array<any> | void = await this.msgIoService.getMessages().pipe(take(1)).toPromise();
      const userData = await this.authService.getUserData();
      // Convert encoded text to normal text
      if (messages) {
        messages.forEach(message => {
          message.contents = SettingsComponent.decodeHtml(message.contents);
        });
      } else {
        messages = [ {
          error: 'No messages found'
        } ];
      }
      // Convert data to JSON
      const messagesJSON = JSON.stringify(messages, null, 2);
      const userJSON = JSON.stringify(userData, null, 2);
      // Set download buttons
      this.downloadMessagesData = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(messagesJSON));
      this.downloadUserData = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(userJSON));
      downloadModal.modal('show');
    } catch (e) {
      this.exportErrorText = e;
      exportErrorModal.modal('show');
      return;
    }
  }
}
