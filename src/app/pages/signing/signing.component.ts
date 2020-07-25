import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { SigningService } from '../../core/signing.service';
import { MsgIoService } from '../../core/msg-io.service';
import { Title } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

declare var $: any;

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
  public embedLink = '';
  public imageWidth = 50;
  public copyButtonText = 'Copy';
  public photoUrl = '';

  public signerName = '';
  public signerPhotoUrl = '';
  private uid: string;
  private key: string;

  constructor(private route: ActivatedRoute, private authService: AuthService, public signingService: SigningService,
              private msgIo: MsgIoService, private router: Router, private title: Title, public deviceDetector: DeviceDetectorService) { }

  /**
   * Extract query parameters, maximum message length, fonts, and recipient username from appropriate services
   */
  ngOnInit(): void {
    // set variables
    this.authService.redirectLoginUserCreation().catch(error => AuthService.displayError(error));
    this.route.queryParams.subscribe(params => {
      this.uid = params.uid;
      this.key = params.key;
    });
    this.authService.displayName(this.uid).then(userName => {
      this.name = userName;
      this.title.setTitle('Signing ' + userName + '\'s Virtrolio | Virtrolio');
    }).catch(error => alert(error));
    this.signingService.resetDefaultValues();
    $('[data-toggle="popover"]').popover();
    $('.popover-dismiss').popover({
      trigger: 'focus'
    });
    try {
      this.authService.profilePictureLink(this.uid).then((photoUrl) => { this.photoUrl = photoUrl; });
    } catch (e) {
      // default picture is the logo
      this.photoUrl = '../../../../assets/images/logo_reg.png';
    }
    try {
      this.authService.profilePictureLink().then((signerphotoUrl) => { this.signerPhotoUrl = signerphotoUrl; });
    } catch (e) {
      // default picture is the logo
      this.signerPhotoUrl = '../../../../assets/images/logo_reg.png';
    }
    try {
      this.authService.displayName().then((signerName) => { this.signerName = signerName; console.log(this.signerName)});
    } catch (e) {
      // default name is blank
      this.signerName = '';
    }
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
   * Resets image width slider value to 100 or 0 if the user tries to input a number that's too large
   */
  checkSliderValue() {
    if (this.imageWidth > 100) {
      this.imageWidth = 100;
    } else if (this.imageWidth < 0) {
      this.imageWidth = 0;
    }
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

  /**
   * Selects an inputElement's field and copies its contents to the clipboard, updating the button to confirm the copy
   * @param inputElement - the element to read from
   */
  copyLink(inputElement: HTMLInputElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, 10000);
    document.execCommand('copy');
    this.copyButtonText = 'Copied!';
  }

  /**
   * Generate a darkened version of backColor, returning this new header color and the appropriate header text color
   * @param backColor: background color of the message
   */
  generateHeaderColor(backColor: string) {
    const bgR = parseInt(backColor.slice(1, 3), 16);
    const bgG = parseInt(backColor.slice(3, 5), 16);
    const bgB = parseInt(backColor.slice(5), 16);
    let headerTextColor;
    let trashIcon;
    let popupIcon;
    if (this.getLightness(bgR, bgG, bgB) > 0.65) {
      headerTextColor = '#000000';
      trashIcon = '../../../../assets/images/icons/trash-black.svg';
      popupIcon = '../../../../assets/images/icons/maximize-black.svg';
    } else {
      headerTextColor = '#FFFFFF';
      trashIcon = '../../../../assets/images/icons/trash-white.svg';
      popupIcon = '../../../../assets/images/icons/maximize-white.svg';
    }
    const hR = bgR + 20 > 255 ? 255 : bgR + 20;
    const hG = bgG + 20 > 255 ? 255 : bgG + 20;
    const hB = bgB + 20 > 255 ? 255 : bgB + 20;
    const headerColor = hR.toString(16) + hG.toString(16) + hB.toString(16);

    return { bg: '#' + headerColor, text: headerTextColor, trash: trashIcon, popup: popupIcon };
  }

  /**
   * Generate the lightness value of HSL from RBG
   */
  getLightness(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return (max + min) / 2;
  }


}
