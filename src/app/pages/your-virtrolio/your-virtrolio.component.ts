import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-your-virtrolio',
  templateUrl: './your-virtrolio.component.html',
  styleUrls: [ './your-virtrolio.component.css' ]
})

/**
 * 'Your virtrolio.' Displays your virtrolio as a 'book' on screen and allows you to generate a sharing link.
 */
export class YourVirtrolioComponent implements OnInit {
  /** Default values */
  public link = 'Getting your link...';
  public linkReady = false;
  public showWarningText = false;
  public copyButtonText = 'Copy';
  public displayName: string;
  public visitLink: string;
  private visitLinkUID: string;
  private visitLinkKEY: string;

  constructor(public authService: AuthService, public router: Router, private title: Title) { }

  ngOnInit(): void {
    this.authService.displayName().then((displayName) => {
      this.displayName = displayName;
      this.title.setTitle(displayName + '\'s Virtrolio | Virtrolio');
    });
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
    this.authService.getLink().then(link => {
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
        this.router.navigate([ '/invalid-link' ]).catch(e => AuthService.displayError(e));
      }
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
      this.authService.changeKey().then(() => this.setLink()).catch(error => alert(AuthService.displayError(error)));
      this.setLink();
    }
    this.showWarningText = !this.showWarningText;
  }

}
