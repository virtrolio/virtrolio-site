import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { SigningService } from '../../core/signing.service';
import { MsgIoService } from '../../core/msg-io.service';

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

  private uid: string;
  private key: string;

  constructor(private route: ActivatedRoute, private authService: AuthService, public signingService: SigningService,
              private msgIo: MsgIoService, private router: Router) { }

  /**
   * Extract query parameters, maximum message length, fonts, and recipient username from appropriate services
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.uid = params.uid;
      this.key = params.key;
    });
    this.authService.displayName(this.uid).then(userName => this.name = userName).catch(error => alert(error));
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

  /**
   * Creates a new blank message and fills in all the info before sending it
   * @param textbox - the textbox where the contents of the message are retrieved from (not the preview box)
   */
  sendMsg(textbox: HTMLTextAreaElement) {
    const newMsg = this.msgIo.createBlankMessage();
    let valid = true;
    newMsg.backColor = this.signingService.backgroundColor;
    newMsg.fontColor = this.signingService.textColor;
    newMsg.fontFamily = this.signingService.currentFont;
    newMsg.contents = textbox.value;
    newMsg.to = this.uid;

    // remove navigation popup
    this.sending = true;
    this.msgIo.sendMessage(newMsg, this.key).then(() =>
      void (0))
      .catch(error => {
          alert(error);
          valid = false;
        }
      );
    // set timeout waits until after the next event to do stuff
    // hopefully this works :)
    setTimeout(() => {
      if (valid) {
        this.router.navigate([ '/msg-sent' ], { queryParams : {  name: this.name }});
      }
    }, 0);
  }
}
