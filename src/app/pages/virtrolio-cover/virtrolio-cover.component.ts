import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-virtrolio-cover',
  templateUrl: './virtrolio-cover.component.html',
  styleUrls: [ './virtrolio-cover.component.css' ]
})

/**
 * 'Your virtrolio.' Displays your virtrolio as a 'book' on screen and allows you to generate a sharing link.
 */
export class VirtrolioCoverComponent implements OnInit {
  /** Default values */
  public link = 'Getting your link...';
  public linkReady = false;
  public showWarningText = false;
  public copyButtonText = 'Copy';
  public displayName;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.displayName().then((displayName) => {this.displayName = displayName});
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
   * Return display name.
   */
  getDisplayName() {
    return this.authService.displayName().then(displayName => {
      return displayName;
    }).catch(error => console.log(error));
  }

  /**
   * Fetches the user's sharing link, alerts an error on invalid link
   */
  setLink() {
    this.copyButtonText = 'Copy';
    this.authService.getLink().then(link => this.link = link);
    this.linkReady = true;
  }

  /**
   * Toggles between displaying warning text and updating the sharing link in the text box.
   */
  warnAndGenerate() {
    if (this.showWarningText) {
      this.link = 'Generating new link...';
      this.linkReady = false;
      this.copyButtonText = 'Copy';
      this.authService.changeKey().catch(error => alert(error +
        '\nIf this problem persists, please contact us at virtrolio.team@gmail.com')).then(() => this.setLink());
      this.setLink();
    }
    this.showWarningText = !this.showWarningText;
  }

}
