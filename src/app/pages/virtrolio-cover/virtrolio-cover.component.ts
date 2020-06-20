import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-virtrolio-cover',
  templateUrl: './virtrolio-cover.component.html',
  styleUrls: ['./virtrolio-cover.component.css']
})
export class VirtrolioCoverComponent implements OnInit {
  /** Default values for variables */
  public link = 'Getting your link...';
  public linkReady = false;
  public warningText = false;
  public copyButtonText = 'copy';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Copy link highlights an inputElement and copies its value to clipboard, updating the button to confirm the copy
   * @param inputElement - the element to read from and copy its contents
   */
  copyLink(inputElement: HTMLInputElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, 10000);
    document.execCommand('copy');
    this.copyButtonText = 'copied!';
  }

  setLink() {
    this.copyButtonText = 'copy';
    this.authService.getLink().then(
      link => this.link = link
    ).catch(error => alert('No key or userid was found! If this problem persists, please contact us at virtrolio.team@gmail.com'));
    this.linkReady = true;
  }

  warnAndGenerate() {
    if (this.warningText) {
      this.link = 'Generating new link...';
      this.linkReady = false;
      this.copyButtonText = 'copy';
      this.authService.changeKey().catch(error => alert('An invalid key was generated! If this problem persists, please contact us at virtrolio.team@gmail.com'));
      this.setLink();
    }
    this.warningText = !this.warningText;
  }

}
