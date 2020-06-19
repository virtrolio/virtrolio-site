import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-virtrolio-cover',
  templateUrl: './virtrolio-cover.component.html',
  styleUrls: ['./virtrolio-cover.component.css']
})
export class VirtrolioCoverComponent implements OnInit {
  public link = 'Getting your link...';
  public linkReady = false;
  public warningText = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  copyLink(inputElement, buttonElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, 10000);
    document.execCommand('copy');
    buttonElement.innerHTML = 'Copied!';
  }

  setLink() {
    this.authService.getLink().then(
      link => this.link = link
    ).catch(error => alert('No key or userid was found! If this problem persists, please contact us at virtrolio.team@gmail.com'));
    this.linkReady = true;
  }

  warnAndGenerate() {
    if (this.warningText) {
      this.link = 'Generating new link...';
      this.linkReady = false;
      this.authService.changeKey().catch(error => alert('An invalid key was generated! If this problem persists, please contact us at virtrolio.team@gmail.com'));
      this.setLink();
    }
    this.warningText = !this.warningText;
  }

}
