import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../core/app-auth.service';
import { LinkGenService } from '../../core/link-gen.service';

@Component({
  selector: 'app-virtrolio-cover',
  templateUrl: './virtrolio-cover.component.html',
  styleUrls: ['./virtrolio-cover.component.css']
})
export class VirtrolioCoverComponent implements OnInit {
  public link = 'Generating link...';
  public linkReady = false;

  constructor(public authService: AppAuthService, private lgs: LinkGenService) { }

  ngOnInit(): void {
  }

  copyLink(inputElement, buttonElement) {
    inputElement.select();
    inputElement.setSelectionRange(0, 10000);
    document.execCommand('copy');
    buttonElement.innerHTML = 'Copied!';
  }

  setLink() {
    this.lgs.getLink().then(
      link => this.link = link
    );
    this.linkReady = true;
  }

}
