import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { SigningService } from '../../core/signing.service';
import { MsgIoService } from '../../core/msg-io.service';
import { Title } from '@angular/platform-browser';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: [ './signing.component.css' ]
})

/**
 * Controls user interaction with the signing box, updating the preview display and sending the message when they
 * click on the 'Send' button.
 */
export class SigningComponent implements OnInit {
  public name = 'your friend';
  public sending = false;
  public scrollSyncLoc = 0;

  private uid: string;
  private key: string;

  constructor(private route: ActivatedRoute, private authService: AuthService, public signingService: SigningService,
              private msgIo: MsgIoService, private router: Router, private title: Title) { }

  /**
   * Extract query parameters, maximum message length, fonts, and recipient username from appropriate services
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.uid = params.uid;
      this.key = params.key;
    });
    this.authService.displayName(this.uid).then(userName => {
      this.name = userName;
      this.title.setTitle('Signing ' + userName + '\'s Virtrolio | Virtrolio');
    }).catch(error => alert(error));
    this.signingService.resetDefaultValues();
  }

  /**
   * Returns whether or not the user can navigate (safely) away
   * Returning true will navigate instantly
   * Returning false will prompt the user to confirm the navigation
   */
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.signingService.signingBoxText || this.sending;
  }

  syncMarkdown(textbox: HTMLTextAreaElement, previewBox: MarkdownComponent) {
    previewBox.element.nativeElement.scrollTop = textbox.scrollTop;
  }

  syncSigning(previewBox: MarkdownComponent, textbox: HTMLTextAreaElement) {
    textbox.scrollTop = previewBox.element.nativeElement.scrollTop;
  }

  /**
   * Creates a new blank message and fills in all the info before sending it
   * @param textbox - the textbox where the contents of the message are retrieved from (not the preview box)
   */
  sendMsg(textbox: HTMLTextAreaElement) {
    const newMsg = this.msgIo.createBlankMessage();
    newMsg.backColor = this.signingService.backgroundColor;
    newMsg.fontColor = this.signingService.textColor;
    newMsg.fontFamily = this.signingService.currentFont;
    newMsg.contents = textbox.value;
    newMsg.to = this.uid;

    // remove navigation popup
    this.sending = true;
    this.msgIo.sendMessage(newMsg, this.key).then(() => {
      this.router.navigate([ '/msg-sent' ], { queryParams: { name: this.name } })
        .catch(e => AuthService.displayError(e));
    }).catch(error => {
        AuthService.displayError(error);
      }
    );
  }
}
