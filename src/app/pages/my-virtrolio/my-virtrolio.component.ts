import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { CommonService } from '../../core/common.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SharingLinkService } from '../../core/sharing-link.service';
import { MsgIoService } from '../../core/msg-io.service';

@Component({
  selector: 'app-my-virtrolio',
  templateUrl: './my-virtrolio.component.html',
  styleUrls: [ './my-virtrolio.component.css' ]
})

/**
 * 'My virtrolio.' Displays your virtrolio as a 'book' on screen and allows you to generate a sharing link.
 */
export class MyVirtrolioComponent implements OnInit {
  /** Default values */
  public link = 'Getting your link...';
  public linkReady = false;
  public showWarningText = false;
  public copyButtonText = 'Copy';
  public displayName: string;
  public visitLink: string;
  private visitLinkUID: string;
  private visitLinkKEY: string;
  public navigator: any;

  constructor(public authService: AuthService, private sharingLinkService: SharingLinkService,
              public router: Router, private title: Title) { }

  ngOnInit(): void {
    this.authService.displayName().then((displayName) => {
      this.displayName = displayName;
      this.title.setTitle(displayName + '\'s Virtrolio | Virtrolio');
    });
    this.authService.redirectLoginUserCreation().catch(error => CommonService.displayError(error));
    this.navigator = window.navigator;
  }

  /**
   * Check if user can share using a native sharing mechanism (i.e. if they are on mobile)
   * @returns - True if the user has a native sharing mechanism available
   */
  canShare() {
    return this.navigator && this.navigator.share;
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
   * Fetches the user's sharing link, alerts an error on invalid link
   */
  setLink() {
    this.copyButtonText = 'Copy';
    this.sharingLinkService.getLink().then(link => {
      this.link = link;
      this.linkReady = true;
    });
  }

  /**
   * Attempts to navigate by router to a sharing link based on what is inputted in the 'send a message' input field (query
   * params extracted with regEx if possible)
   */
  navigateToLink() {
    if (this.visitLink) {
      try {
        // noinspection JSIgnoredPromiseFromCall
        this.visitLinkUID = this.visitLink.match(/uid=([^&]*)/)[1];
        this.visitLinkKEY = this.visitLink.match(/key=([^&]*)/)[1];
        window.location.href = '/signing?uid=' + this.visitLinkUID + '&key=' + this.visitLinkKEY;
      } catch (e) {
        this.router.navigate([ '/invalid-link' ]).catch(e => CommonService.displayError(e));
      }
    }
  }

  /**
   * Share 'sharing link' using device native sharing mechanism. Should only be available on the front end to the user if they have a native
   * sharing mechanism.
   */
  shareLink() {
    if (this.canShare()) {
      this.navigator.share({
        title: this.displayName + '\'s virtrolio for' + MsgIoService.currentYear + '!',
        text: 'Sign my virtual yearbook!',
        url: this.link,
      })
        .catch((error) => CommonService.displayError('Sharing Error: ' + error));
    } else {
      CommonService.displayError('Sharing Error: Native Share not supported on this browser: ' + navigator.userAgent);
    }
  }

  /**
   * Share the user's sharing link on the appropriate platform
   * @param platform - platform on which to post the sharing link
   */
  postOnSocial(platform: string) {
    const urlFriendlyLink = 'https%3A//virtrolio.web.app/signing?uid=' + this.authService.uid() + '%26key=' +
      this.link.match(/key=([^&]*)/)[1];

    const bodyText = 'Sign%20my%20virtual%20yearbook!';

    if (platform === 'facebook') {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + urlFriendlyLink, '_blank');
    } else if (platform === 'twitter') {
      window.open('https://twitter.com/intent/tweet?url=' + urlFriendlyLink + '&text=' + bodyText, '_blank');
    } else if (platform === 'email') {
      window.open('mailto:?subject=' + 'Virtrolio%20-%20Online%20Yearbook%20Signing!'
        + '&body=' + bodyText + '%0D%0A' + urlFriendlyLink, '_blank');
    } else {
      CommonService.displayError('Sharing Error: Unsupported social media platform: ' + platform);
    }
  }

  /**
   * Toggles between displaying warning text and updating the sharing link in the text box.
   */
  warnAndGenerate() {
    if (this.showWarningText) {
      this.link = 'Generating new link...';
      this.linkReady = false;
      this.copyButtonText = 'Copy';
      this.sharingLinkService.changeKey().then(() => this.setLink()).catch(error => CommonService.displayError(error));
      this.setLink();
    }
    this.showWarningText = !this.showWarningText;
  }

}
